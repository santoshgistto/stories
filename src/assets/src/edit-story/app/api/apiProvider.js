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
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { DATA_VERSION } from '@stories/migration';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { addQueryArgs } from '../../../design-system';
import base64Encode from '../../utils/base64Encode';
import { useConfig } from '../config';
import Context from './context';
import getAllPageLayouts from './getAllPageLayouts';

function APIProvider({ children }) {
  const {
    api: { stories, media, link, users, statusCheck, metaBoxes, currentUser },
    encodeMarkup,
    cdnURL,
    assetsURL,
  } = useConfig();

  const getStoryById = useCallback(
    (storyId) => {
      const path = addQueryArgs(`${stories}${storyId}/`, {
        context: 'edit',
        _embed: 'wp:featuredmedia,author',
        web_stories_demo: false,
      });
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("setTimeout myPromise")
          resolve(JSON.parse(dummyPostData));
        }, 300);
      });

      console.log("getStoryById  path : ",path)

     // return apiFetch({ path });
      return myPromise;
    },
    [stories]
  );

  const dummyPostData = `{
    "id": 56,
    "date": "2021-02-20T11:51:20",
    "date_gmt": "2021-02-20T11:51:20",
    "guid": {
      "rendered": "http://localhost:8899/?post_type=web-story&p=56",
      "raw": "http://localhost:8899/?post_type=web-story&p=56"
    },
    "modified": "2021-02-20T11:51:20",
    "modified_gmt": "2021-02-20T11:51:20",
    "password": "",
    "slug": "",
    "status": "auto-draft",
    "type": "web-story",
    "link": "http://localhost:8899/?post_type=web-story&p=56",
    "title": {
      "raw": "",
      "rendered": "Untitled"
    },
    "content": {
      "raw": "",
      "rendered": "",
      "protected": false,
      "block_version": 0
    },
    "excerpt": {
      "raw": "",
      "rendered": "",
      "protected": false
    },
    "author": 1,
    "featured_media": 0,
    "template": "",
    "permalink_template": "http://localhost:8899/web-stories/%pagename%",
    "generated_slug": "56",
    "story_data": [],
    "featured_media_url": "",
    "publisher_logo_url": null,
    "style_presets": {
      "colors": [],
      "textStyles": []
    },
    "preview_link": "http://localhost:8899/?post_type=web-story&p=56&preview=true",
    "_links": {
      "self": [{
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story/56"
      }],
      "collection": [{
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story"
      }],
      "about": [{
        "href": "http://localhost:8899/wp-json/wp/v2/types/web-story"
      }],
      "author": [{
        "embeddable": true,
        "href": "http://localhost:8899/wp-json/wp/v2/users/1"
      }],
      "version-history": [{
        "count": 0,
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story/56/revisions"
      }],
      "wp:attachment": [{
        "href": "http://localhost:8899/wp-json/wp/v2/media?parent=56"
      }],
      "wp:action-publish": [{
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story/56"
      }],
      "wp:action-unfiltered-html": [{
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story/56"
      }],
      "wp:action-assign-author": [{
        "href": "http://localhost:8899/wp-json/web-stories/v1/web-story/56"
      }],
      "curies": [{
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }]
    },
    "_embedded": {
      "author": [{
        "id": 1,
        "name": "admin",
        "url": "http://localhost:8899",
        "description": "",
        "link": "http://localhost:8899/author/admin",
        "slug": "admin",
        "avatar_urls": {
          "24": "http://2.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=24&d=mm&r=g",
          "48": "http://2.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=48&d=mm&r=g",
          "96": "http://2.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=96&d=mm&r=g"
        },
        "_links": {
          "self": [{
            "href": "http://localhost:8899/wp-json/wp/v2/users/1"
          }],
          "collection": [{
            "href": "http://localhost:8899/wp-json/wp/v2/users"
          }]
        }
      }]
    }
  }`

  const getDemoStoryById = useCallback(
    (storyId) => {
      const path = addQueryArgs(`${stories}${storyId}/`, {
        context: 'edit',
        _embed: 'wp:featuredmedia,author',
        web_stories_demo: true,
      });
      console.log("getDemoStoryById path : ",path)

      return apiFetch({ path });
    },
    [stories]
  );

  const getStorySaveData = useCallback(
    ({
      pages,
      featuredMedia,
      globalStoryStyles,
      publisherLogo,
      autoAdvance,
      defaultPageDuration,
      currentStoryStyles,
      content,
      author,
      ...rest
    }) => {
      console.log("getStorySaveData pages : ",pages)
      return {
        story_data: {
          version: DATA_VERSION,
          pages,
          autoAdvance,
          defaultPageDuration,
          currentStoryStyles,
        },
        featured_media: featuredMedia.id,
        style_presets: globalStoryStyles,
        publisher_logo: publisherLogo,
        content: encodeMarkup ? base64Encode(content) : content,
        author: author.id,
        ...rest,
      };
    },
    [encodeMarkup]
  );

  const saveStoryById = useCallback(
    /**
     * Fire REST API call to save story.
     *
     * @param {import('../../types').Story} story Story object.
     * @return {Promise} Return apiFetch promise.
     */
    (story) => {
      const { storyId } = story;
      console.log("saveStoryById pages : ",story)

      return apiFetch({
        path: `${stories}${storyId}/`,
        data: getStorySaveData(story),
        method: 'POST',
      });
    },
    [stories, getStorySaveData]
  );

  const autoSaveById = useCallback(
    /**
     * Fire REST API call to save story.
     *
     * @param {import('../../types').Story} story Story object.
     * @return {Promise} Return apiFetch promise.
     */
    (story) => {
      const { storyId } = story;
      console.log("autoSaveById pages : ",story)

      return apiFetch({
        path: `${stories}${storyId}/autosaves/`,
        data: getStorySaveData(story),
        method: 'POST',
      });
    },
    [stories, getStorySaveData]
  );

  const getMedia = useCallback(
    ({ mediaType, searchTerm, pagingNum, cacheBust }) => {
      let apiPath = media;
      const perPage = 100;
      apiPath = addQueryArgs(apiPath, {
        context: 'edit',
        per_page: perPage,
        page: pagingNum,
        _web_stories_envelope: true,
      });

      if (mediaType) {
        apiPath = addQueryArgs(apiPath, { media_type: mediaType });
      }

      if (searchTerm) {
        apiPath = addQueryArgs(apiPath, { search: searchTerm });
      }

      // cacheBusting is due to the preloading logic preloading and caching
      // some requests. (see preload_paths in Dashboard.php)
      // Adding cache_bust forces the path to look different from the preloaded
      // paths and hence skipping the cache. (cache_bust itself doesn't do
      // anything)
      if (cacheBust) {
        apiPath = addQueryArgs(apiPath, { cache_bust: true });
      }
      console.log("getMedia apiPath : ",apiPath)
      return apiFetch({ path: apiPath }).then((response) => {
        return { data: response.body, headers: response.headers };
      });
    },
    [media]
  );

  /**
   * Upload file to via REST API.
   *
   * @param {File}    file           Media File to Save.
   * @param {?Object} additionalData Additional data to include in the request.
   *
   * @return {Promise} Media Object Promise.
   */
  const uploadMedia = useCallback(
    (file, additionalData) => {
      // Create upload payload
      const data = new window.FormData();
      data.append('file', file, file.name || file.type.replace('/', '.'));
      Object.entries(additionalData).forEach(([key, value]) =>
        data.append(key, value)
      );
      console.log("uploadMedia data : ",data)


      // TODO: Intercept window.fetch here to support progressive upload indicator when uploading
      return apiFetch({
        path: media,
        body: data,
        method: 'POST',
      });
    },
    [media]
  );

  /**
   * Update Existing media.
   *
   * @param  {number} mediaId
   * @param  {Object} data Object of properties to update on attachment.
   * @return {Promise} Media Object Promise.
   */
  const updateMedia = useCallback(
    (mediaId, data) => {
      console.log("updateMedia mediaId : ",mediaId)

      return apiFetch({
        path: `${media}${mediaId}/`,
        data,
        method: 'POST',
      });
    },
    [media]
  );

  /**
   * Delete existing media.
   *
   * @param  {number} mediaId
   * @return {Promise} Media Object Promise.
   */
  const deleteMedia = useCallback(
    (mediaId) => {
      // `apiFetch` by default turns `DELETE` requests into `POST` requests
      // with `X-HTTP-Method-Override: DELETE` headers.
      // However, some Web Application Firewall (WAF) solutions prevent this.
      // `?_method=DELETE` is an alternative solution to override the request method.
      // See https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/#_method-or-x-http-method-override-header
      return apiFetch({
        path: addQueryArgs(`${media}${mediaId}/`, { _method: 'DELETE' }),
        data: { force: true },
        method: 'POST',
      });
    },
    [media]
  );

  /**
   * Gets metadata (title, favicon, etc.) from
   * a provided URL.
   *
   * @param  {number} url
   * @return {Promise} Result promise
   */
  const getLinkMetadata = useCallback(
    (url) => {
      const path = addQueryArgs(link, { url });
      console.log("getLinkMetadata path : ",path)

      return apiFetch({
        path,
      });
    },
    [link]
  );

  const getAuthors = useCallback(
    (search = null) => {
      console.log("getAuthors users : ",users)
      return apiFetch({
        path: addQueryArgs(users, { per_page: '100', who: 'authors', search }),
      });
    },
    [users]
  );

  const getCurrentUser = useCallback(() => {
    console.log("getAuthors currentUser : ",currentUser)
    return apiFetch({
      path: currentUser,
    });
  }, [currentUser]);

  const updateCurrentUser = useCallback(
    (data) => {
      console.log("updateCurrentUser currentUser : ",currentUser)

      return apiFetch({
        path: currentUser,
        method: 'POST',
        data,
      });
    },
    [currentUser]
  );

  // See https://github.com/WordPress/gutenberg/blob/148e2b28d4cdd4465c4fe68d97fcee154a6b209a/packages/edit-post/src/store/effects.js#L72-L126
  const saveMetaBoxes = useCallback(
    (story, formData) => {
      // Additional data needed for backward compatibility.
      // If we do not provide this data, the post will be overridden with the default values.
      const additionalData = [
        story.comment_status ? ['comment_status', story.comment_status] : false,
        story.ping_status ? ['ping_status', story.ping_status] : false,
        story.sticky ? ['sticky', story.sticky] : false,
        story.author ? ['post_author', story.author.id] : false,
      ].filter(Boolean);

      additionalData.forEach(([key, value]) => formData.append(key, value));
      console.log("saveMetaBoxes metaBoxes : ",metaBoxes)

      return apiFetch({
        url: metaBoxes,
        method: 'POST',
        body: formData,
        parse: false,
      });
    },
    [metaBoxes]
  );

  /**
   * Status check, submit html string.
   *
   * @param {string} HTML string.
   * @return {Promise} Result promise
   */
  const getStatusCheck = useCallback(
    (content) => {
      console.log("getStatusCheck statusCheck : ",statusCheck)

      return apiFetch({
        path: statusCheck,
        data: { content: encodeMarkup ? base64Encode(content) : content },
        method: 'POST',
      });
    },
    [statusCheck, encodeMarkup]
  );

  const getPageLayouts = useCallback(() => {
    console.log("getPageLayouts cdnURL : ",cdnURL)
    console.log("getPageLayouts assetsURL : ",assetsURL)

    return getAllPageLayouts({ cdnURL, assetsURL });
  }, [cdnURL, assetsURL]);

  const state = {
    actions: {
      autoSaveById,
      getStoryById,
      getDemoStoryById,
      getMedia,
      getLinkMetadata,
      saveStoryById,
      getAuthors,
      uploadMedia,
      updateMedia,
      deleteMedia,
      saveMetaBoxes,
      getStatusCheck,
      getPageLayouts,
      getCurrentUser,
      updateCurrentUser,
    },
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

APIProvider.propTypes = {
  children: PropTypes.node,
};

export default APIProvider;


const dummyMedia = `[{
	"id": 37,
	"date": "2021-02-20T07:44:42",
	"date_gmt": "2021-02-20T07:44:42",
	"guid": {
		"rendered": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png",
		"raw": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png"
	},
	"modified": "2021-02-20T07:44:42",
	"modified_gmt": "2021-02-20T07:44:42",
	"slug": "example-3-3",
	"status": "inherit",
	"type": "attachment",
	"link": "http://localhost:8899/example-3-3",
	"title": {
		"raw": "example-3",
		"rendered": "example-3"
	},
	"author": 0,
	"featured_media": 0,
	"comment_status": "open",
	"ping_status": "closed",
	"template": "",
	"meta": {
		"web_stories_poster_id": 0
	},
	"web_story_media_source": [],
	"permalink_template": "http://localhost:8899/?attachment_id=37",
	"generated_slug": "example-3-3",
	"media_source": "",
	"featured_media_src": [],
	"description": {
		"raw": "",
		"rendered": "<p class=\"attachment\"><a href='http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png'><img width=\"169\" height=\"300\" src=\"http://localhost:8899/wp-content/uploads/2021/02/example-3-2-169x300.png\" class=\"attachment-medium size-medium\" alt=\"\" loading=\"lazy\" srcset=\"http://localhost:8899/wp-content/uploads/2021/02/example-3-2-169x300.png 169w, http://localhost:8899/wp-content/uploads/2021/02/example-3-2-150x267.png 150w, http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png 375w\" sizes=\"(max-width: 169px) 100vw, 169px\" style=\"width:100%;height:177.87%;max-width:375px;\" /></a></p>\n"
	},
	"caption": {
		"raw": "",
		"rendered": ""
	},
	"alt_text": "",
	"media_type": "image",
	"mime_type": "image/png",
	"media_details": {
		"width": 375,
		"height": 667,
		"file": "2021/02/example-3-2.png",
		"sizes": {
			"medium": {
				"file": "example-3-2-169x300.png",
				"width": 169,
				"height": 300,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-169x300.png"
			},
			"thumbnail": {
				"file": "example-3-2-150x150.png",
				"width": 150,
				"height": 150,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-150x150.png"
			},
			"web-stories-poster-landscape": {
				"file": "example-3-2-375x640.png",
				"width": 375,
				"height": 640,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-375x640.png"
			},
			"web-stories-poster-square": {
				"file": "example-3-2-375x640.png",
				"width": 375,
				"height": 640,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-375x640.png"
			},
			"web-stories-publisher-logo": {
				"file": "example-3-2-96x96.png",
				"width": 96,
				"height": 96,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-96x96.png"
			},
			"web-stories-thumbnail": {
				"file": "example-3-2-150x267.png",
				"width": 150,
				"height": 267,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2-150x267.png"
			},
			"full": {
				"file": "example-3-2.png",
				"width": 375,
				"height": 667,
				"mime_type": "image/png",
				"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png"
			}
		},
		"image_meta": {
			"aperture": "0",
			"credit": "",
			"camera": "",
			"caption": "",
			"created_timestamp": "0",
			"copyright": "",
			"focal_length": "0",
			"iso": "0",
			"shutter_speed": "0",
			"title": "",
			"orientation": "0",
			"keywords": []
		}
	},
	"post": null,
	"source_url": "http://localhost:8899/wp-content/uploads/2021/02/example-3-2.png",
	"missing_image_sizes": [],
	"_links": {
		"self": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media/37"
		}],
		"collection": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media"
		}],
		"about": [{
			"href": "http://localhost:8899/wp-json/wp/v2/types/attachment"
		}],
		"replies": [{
			"embeddable": true,
			"href": "http://localhost:8899/wp-json/wp/v2/comments?post=37"
		}],
		"wp:term": [{
			"taxonomy": "web_story_media_source",
			"embeddable": true,
			"href": "http://localhost:8899/wp-json/wp/v2/web_story_media_source?post=37"
		}],
		"wp:action-unfiltered-html": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media/37"
		}],
		"wp:action-assign-author": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media/37"
		}],
		"wp:action-create-web_story_media_source": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media/37"
		}],
		"wp:action-assign-web_story_media_source": [{
			"href": "http://localhost:8899/wp-json/web-stories/v1/media/37"
		}],
		"curies": [{
			"name": "wp",
			"href": "https://api.w.org/{rel}",
			"templated": true
		}]
	}
}]`

