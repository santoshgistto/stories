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
import { __ } from '@stories/i18n';

/**
 * Internal dependencies
 */
import { useRef } from 'react';
import { Row } from '../../../form';
import {
  Note,
  ExpandedTextInput,
  getCommonValue,
  useCommonObjectValue,
} from '../../shared';
import { SimplePanel } from '../../panel';
import { useFocusHighlight, states, styles } from '../../../../app/highlights';

const DEFAULT_RESOURCE = { alt: null };
const MIN_MAX = {
  ALT_TEXT: {
    MAX: 1000,
  },
};

function ImageAccessibilityPanel({ selectedElements, pushUpdate }) {
  const resource = useCommonObjectValue(
    selectedElements,
    'resource',
    DEFAULT_RESOURCE
  );
  const alt = getCommonValue(selectedElements, 'alt', resource.alt);
  const ref = useRef(null);
  const highlight = useFocusHighlight(states.ASSISTIVE_TEXT, ref);

  return (
    <SimplePanel
      css={highlight && styles.FLASH}
      name="imageAccessibility"
      title={__('Accessibility', 'web-stories')}
      isPersistable={!highlight}
    >
      <Row>
        <ExpandedTextInput
          ref={ref}
          placeholder={__('Assistive text', 'web-stories')}
          value={alt || ''}
          onChange={(value) => pushUpdate({ alt: value || null })}
          clear
          aria-label={__('Assistive text', 'web-stories')}
          maxLength={MIN_MAX.ALT_TEXT.MAX}
          css={highlight?.showEffect && styles.OUTLINE}
        />
      </Row>
      <Row>
        <Note>{__('Text for visually impaired users.', 'web-stories')}</Note>
      </Row>
    </SimplePanel>
  );
}

ImageAccessibilityPanel.propTypes = {
  selectedElements: PropTypes.array.isRequired,
  pushUpdate: PropTypes.func.isRequired,
};

export default ImageAccessibilityPanel;
