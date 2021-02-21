import logo from './logo.svg';
import './App.css';
import EditorApp from './assets/src/edit-story/editorApp';
import { FlagsProvider } from 'flagged';

function App() {
  return (
    <div style={{
      height:800
    }}>
          <FlagsProvider features={JSON.parse(flagsData)}>

         <EditorApp config={JSON.parse(editorConfigData)} />
         </FlagsProvider>
    </div>
  );
}
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

const editorConfigData = `{
	"autoSaveInterval": 60,
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
	"allowedFileTypes": ["gif", "jpe", "jpeg", "jpg", "m4v", "mp4", "png", "webm"],
	"allowedImageMimeTypes": ["image/png", "image/jpeg", "image/gif"],
	"allowedMimeTypes": {
		"image": ["image/png", "image/jpeg", "image/gif"],
		"audio": [],
		"video": ["video/mp4", "video/webm"]
	},
	"postType": "web-story",
	"storyId": 46,
	"assetsURL": "http://localhost:8899/wp-content/plugins/web-stories/assets/",
	"cdnURL": "https://wp.stories.google/static/main/",
	"maxUpload": 104857600,
	"isDemo": false,
	"capabilities": {
		"hasPublishAction": true,
		"hasAssignAuthorAction": true,
		"hasUploadMediaAction": true
	},
	"api": {
		"users": "/web-stories/v1/users/",
		"currentUser": "/web-stories/v1/users/me/",
		"stories": "/web-stories/v1/web-story/",
		"media": "/web-stories/v1/media/",
		"link": "/web-stories/v1/link/",
		"statusCheck": "/web-stories/v1/status-check/",
		"metaBoxes": "http://localhost:8899/wp-admin/post.php?post=46&action=edit&meta-box-loader=1&meta-box-loader-nonce=52fa5ac11f"
	},
	"metadata": {
		"publisher": {
			"name": "Web Stories Dev",
			"logo": null
		}
	},
	"version": "1.3.0",
	"encodeMarkup": true,
	"metaBoxes": {
		"normal": [],
		"advanced": [],
		"side": []
	},
	"ffmpegCoreUrl": "https://wp.stories.google/static/main/js/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js"
}`
export default App;
