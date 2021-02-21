import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import App from './assets/src/edit-story/editorApp';
//import App from './assets/src/dashboard/app';


//<App  config={{"storyId":1}}/>
let id = "web-stories-dashboard";
const configData = `{
	"isRTL": false,
	"locale": {
		"locale": "en-US",
		"dateFormat": "F j, Y",
		"timeFormat": "g:i a",
		"gmtOffset": "0",
		"timezone": "",
		"months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		"monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		"weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		"weekdaysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		"weekdaysInitials": ["S", "M", "T", "W", "T", "F", "S"],
		"weekStartsOn": 1
	},
	"newStoryURL": "/new?post_type=web-story",
	"editStoryURL": "http://localhost:8899/wp-admin/post.php?action=edit",
	"wpListURL": "http://localhost:8899/wp-admin/edit.php?post_type=web-story",
	"assetsURL": "http://localhost:8899/wp-content/plugins/web-stories/assets/",
	"cdnURL": "https://wp.stories.google/static/main/",
	"allowedImageMimeTypes": ["image/png", "image/jpeg", "image/gif"],
	"version": "1.3.0",
	"encodeMarkup": true,
	"api": {
		"stories": "/web-stories/v1/web-story/",
		"media": "/web-stories/v1/media/",
		"currentUser": "/web-stories/v1/users/me/",
		"users": "/web-stories/v1/users/",
		"templates": "/web-stories/v1/web-story-template/",
		"settings": "/web-stories/v1/settings/"
	},
	"maxUpload": 104857600,
	"maxUploadFormatted": "100 MB",
	"capabilities": {
		"canManageSettings": true,
		"canUploadFiles": true,
		"canReadPrivatePosts": true
	},
	"siteKitStatus": {
		"installed": false,
		"active": false,
		"analyticsActive": false,
		"link": "http://localhost:8899/wp-admin/plugin-install.php?s=Site+Kit+by+Google&tab=search"
	}
}`
const flagsData = `{
	"enableSVG": false,
	"videoOptimization": false,
	"enableInProgressViews": false,
	"enableInProgressStoryActions": false,
	"enableInProgressTemplateActions": false,
	"enableBookmarkActions": false,
	"enableTemplatePreviews": false,
	"enableStoryPreviews": false
}`



ReactDOM.render(
  <React.StrictMode>
    <App  />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
