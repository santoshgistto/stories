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
import styled from 'styled-components';
import { __ } from '@stories/i18n';

/**
 * Internal dependencies
 */
import { Panel, PanelContent } from '../../panel';

const Note = styled.p`
  font-style: italic;
  font-family: ${({ theme }) => theme.DEPRECATED_THEME.fonts.label.family};
  font-weight: ${({ theme }) => theme.DEPRECATED_THEME.fonts.label.weight};
  font-size: ${({ theme }) => theme.DEPRECATED_THEME.fonts.label.size};
  line-height: ${({ theme }) => theme.DEPRECATED_THEME.fonts.label.lineHeight};
  margin: 50px 0;
  text-align: center;
`;

function NoSelectionPanel() {
  return (
    <Panel name="noselection" isPersistable={false}>
      <PanelContent hasBorder>
        <Note>{__('Nothing selected', 'web-stories')}</Note>
      </PanelContent>
    </Panel>
  );
}

export default NoSelectionPanel;
