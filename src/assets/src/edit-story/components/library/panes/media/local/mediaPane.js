/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useFeature } from 'flagged';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { __, _n, sprintf } from '@stories/i18n';
import { trackEvent } from '@stories/tracking';

/**
 * Internal dependencies
 */
import { useConfig } from '../../../../../app/config';
import { useLocalMedia } from '../../../../../app/media';
import { useMediaPicker } from '../../../../mediaPicker';
import { SearchInput } from '../../../common';
import { Primary } from '../../../../button';
import useLibrary from '../../../useLibrary';
import createError from '../../../../../utils/createError';
import {
  getResourceFromMediaPicker,
  getTypeFromMime,
} from '../../../../../app/media/utils';
import {
  MediaGalleryMessage,
  PaneHeader,
  PaneInner,
  SearchInputContainer,
  StyledPane,
} from '../common/styles';
import PaginatedMediaGallery from '../common/paginatedMediaGallery';
import Flags from '../../../../../flags';
import resourceList from '../../../../../utils/resourceList';
import { DropDown } from '../../../../form';
import { Placement } from '../../../../popup';
import { PANE_PADDING } from '../../shared';
import { useSnackbar } from '../../../../../app';
import MissingUploadPermissionDialog from './missingUploadPermissionDialog';
import paneId from './paneId';

export const ROOT_MARGIN = 300;

const FilterArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 ${PANE_PADDING} 0 ${PANE_PADDING};
`;

const SearchCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
`;

const FILTERS = [
  { value: '', name: __('All Types', 'web-stories') },
  { value: 'image', name: __('Images', 'web-stories') },
  { value: 'video', name: __('Video', 'web-stories') },
];

function MediaPane(props) {
  const {
    hasMore,
    media,
    isMediaLoading,
    isMediaLoaded,
    mediaType,
    searchTerm,
    setNextPage,
    resetWithFetch,
    setMediaType,
    setSearchTerm,
    uploadVideoPoster,
    totalItems,
  } = useLocalMedia(
    ({
      state: {
        hasMore,
        media,
        isMediaLoading,
        isMediaLoaded,
        mediaType,
        searchTerm,
        totalItems,
      },
      actions: {
        setNextPage,
        resetWithFetch,
        setMediaType,
        setSearchTerm,
        uploadVideoPoster,
      },
    }) => {
      return {
        hasMore,
        media,
        isMediaLoading,
        isMediaLoaded,
        mediaType,
        searchTerm,
        totalItems,
        setNextPage,
        resetWithFetch,
        setMediaType,
        setSearchTerm,
        uploadVideoPoster,
      };
    }
  );

  const { showSnackbar } = useSnackbar();

  const {
    allowedFileTypes,
    allowedMimeTypes: {
      image: allowedImageMimeTypes,
      video: allowedVideoMimeTypes,
    },
  } = useConfig();

  const allowedMimeTypes = useMemo(
    () => [...allowedImageMimeTypes, ...allowedVideoMimeTypes],
    [allowedImageMimeTypes, allowedVideoMimeTypes]
  );

  const { insertElement } = useLibrary((state) => ({
    insertElement: state.actions.insertElement,
  }));

  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);

  const isSearching = searchTerm.length > 0;

  const onClose = resetWithFetch;

  /**
   * Callback of select in media picker to insert media element.
   *
   * @param {Object} mediaPickerEl Object coming from backbone media picker.
   */
  const onSelect = (mediaPickerEl) => {
    const resource = getResourceFromMediaPicker(mediaPickerEl);
    try {
      if (!allowedMimeTypes.includes(resource.mimeType)) {
        /* translators: %s is a list of allowed file extensions. */
        const message = sprintf(
          /* translators: %s: list of allowed file types. */
          __('Please choose only %s to insert into page.', 'web-stories'),
          allowedFileTypes.join(
            /* translators: delimiter used in a list */
            __(', ', 'web-stories')
          )
        );

        throw createError('ValidError', resource.title, message);
      }

      // WordPress media picker event, sizes.medium.url is the smallest image
      insertMediaElement(
        resource,
        mediaPickerEl.sizes?.medium?.url || mediaPickerEl.url
      );

      if (!resource.posterId) {
        // Upload video poster and update media element afterwards, so that the
        // poster will correctly show up in places like the Accessibility panel.
        uploadVideoPoster(resource.id, mediaPickerEl.url);
      }
    } catch (e) {
      showSnackbar({
        message: e.message,
      });
    }
  };

  const openMediaPicker = useMediaPicker({
    onSelect,
    onClose,
    type: allowedMimeTypes,
    onPermissionError: () => setIsPermissionDialogOpen(true),
  });

  /**
   * Filter REST API calls and re-request API.
   *
   * @param {string} value that is passed to rest api to filter.
   */
  const onFilter = useCallback(
    (filter) => {
      setMediaType({ mediaType: filter });
    },
    [setMediaType]
  );

  /**
   * Insert element such image, video and audio into the editor.
   *
   * @param {Object} resource Resource object
   * @return {null|*} Return onInsert or null.
   */
  const insertMediaElement = useCallback(
    (resource, thumbnailURL) => {
      resourceList.set(resource.id, {
        url: thumbnailURL,
        type: 'cached',
      });
      insertElement(resource.type, { resource });
    },
    [insertElement]
  );

  const filterResource = useCallback(
    ({ mimeType, width, height }) => {
      const filterByMimeTypeAllowed = allowedMimeTypes.includes(mimeType);
      const filterByMediaType = mediaType
        ? mediaType === getTypeFromMime(mimeType)
        : true;
      const filterByValidMedia = width && height;

      return filterByMimeTypeAllowed && filterByMediaType && filterByValidMedia;
    },
    [allowedMimeTypes, mediaType]
  );

  const resources = media.filter(filterResource);

  const onSearch = (value) => {
    const trimText = value.trim();
    if (trimText !== searchTerm) {
      setSearchTerm({ searchTerm: trimText });
    }
  };

  useEffect(() => {
    trackEvent('search', {
      search_type: 'media',
      search_term: searchTerm,
      search_filter: mediaType,
    });
  }, [searchTerm, mediaType]);

  const incrementalSearchDebounceMedia = useFeature(
    Flags.INCREMENTAL_SEARCH_DEBOUNCE_MEDIA
  );

  return (
    <StyledPane id={paneId} {...props}>
      <PaneInner>
        <PaneHeader>
          <SearchInputContainer>
            <SearchInput
              initialValue={searchTerm}
              placeholder={__('Search', 'web-stories')}
              onSearch={onSearch}
              incremental={incrementalSearchDebounceMedia}
            />
          </SearchInputContainer>
          <FilterArea>
            <DropDown
              value={mediaType?.toString() || FILTERS[0].value}
              onChange={onFilter}
              options={FILTERS}
              placement={Placement.BOTTOM_START}
              fitContentWidth
            />
            {isSearching && media.length > 0 && (
              <SearchCount>
                {sprintf(
                  /* translators: %d: number of results. */
                  _n(
                    '%d result found',
                    '%d results found',
                    totalItems,
                    'web-stories'
                  ),
                  totalItems
                )}
              </SearchCount>
            )}
            {!isSearching && (
              <Primary onClick={openMediaPicker}>
                {__('Upload', 'web-stories')}
              </Primary>
            )}
          </FilterArea>
        </PaneHeader>

        {isMediaLoaded && !media.length ? (
          <MediaGalleryMessage>
            {isSearching
              ? __('No results found', 'web-stories')
              : __('No media found', 'web-stories')}
          </MediaGalleryMessage>
        ) : (
          <PaginatedMediaGallery
            providerType={'local'}
            resources={resources}
            isMediaLoading={isMediaLoading}
            isMediaLoaded={isMediaLoaded}
            hasMore={hasMore}
            onInsert={insertMediaElement}
            setNextPage={setNextPage}
            searchTerm={searchTerm}
          />
        )}

        <MissingUploadPermissionDialog
          open={isPermissionDialogOpen}
          onClose={() => setIsPermissionDialogOpen(false)}
        />
      </PaneInner>
    </StyledPane>
  );
}

export default MediaPane;
