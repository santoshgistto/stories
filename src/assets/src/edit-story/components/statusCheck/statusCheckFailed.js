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
import styled from 'styled-components';
import { useCallback } from 'react';
import { __, TranslateWithMarkup } from '@stories/i18n';
import { trackClick } from '@stories/tracking';

/**
 * Internal dependencies
 */
import { Plain } from '../button';
import Dialog from '../dialog';
import Link from '../link';

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.DEPRECATED_THEME.fonts.body1.family};
  font-size: ${({ theme }) => theme.DEPRECATED_THEME.fonts.body1.size};
  line-height: ${({ theme }) => theme.DEPRECATED_THEME.fonts.body1.lineHeight};
  letter-spacing: ${({ theme }) =>
    theme.DEPRECATED_THEME.fonts.body1.letterSpacing};
`;

const SUPPORT_URL = __(
  'https://wordpress.org/support/plugin/web-stories/',
  'web-stories'
);

function StatusCheckFailed({ open, onClose }) {
  const onSupportClick = useCallback((evt) => {
    trackClick(evt, 'click_support_page');
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={__('Unable to save your story', 'web-stories')}
      contentLabel={__('Unable to save your story', 'web-stories')}
      actions={<Plain onClick={onClose}>{__('Dismiss', 'web-stories')}</Plain>}
    >
      <Paragraph>
        <TranslateWithMarkup
          mapping={{
            a: (
              <Link
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSupportClick}
              />
            ),
          }}
        >
          {__(
            'We are currently unable to save your story, any changes you make may be lost. This may be due to temporary issues connecting to WordPress. <a>Submit a new support topic</a> for additional help.',
            'web-stories'
          )}
        </TranslateWithMarkup>
      </Paragraph>
    </Dialog>
  );
}

StatusCheckFailed.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatusCheckFailed;
