import React from 'react';
import ReactDOM from 'react-dom';

import { initializeIcons } from '@fluentui/react';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

import { DirectoryBrowser } from './DirectoryBrowser';
import { AzureDirectoryProvider } from './AzureDirectoryProvider';

import { getDefaultWebUri, getDefaultContainerUri as getContainerUri } from './Utils';

initializeIcons();
initializeFileTypeIcons();

const root = document.getElementById('root');

let urlParams = new URLSearchParams(window.location.search);
let containerUri = root?.dataset['containerUri'];

if (containerUri === undefined) {
  let containerName = urlParams.get("container");
  if (containerName == null)
     throw new Error("Nome de container de dados não especificado!");
  containerUri = getContainerUri(containerName);
}

const provider = new AzureDirectoryProvider(containerUri);
const path = document.location.pathname;

ReactDOM.render(<DirectoryBrowser provider={provider} initialPath={path} />, root);