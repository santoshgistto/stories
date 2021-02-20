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
import { Plain } from '../../../../button';
import Dialog from '../../../../dialog';

function MissingUploadPermissionDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={__('Access Restrictions', 'web-stories')}
      actions={<Plain onClick={onClose}>{__('Got it', 'web-stories')}</Plain>}
      maxWidth={285}
    >
      {__(
        `You don't have access to upload images or publish a story. Please check with your administrator to request upload and publish access.`,
        'web-stories'
      )}
    </Dialog>
  );
}

MissingUploadPermissionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MissingUploadPermissionDialog;