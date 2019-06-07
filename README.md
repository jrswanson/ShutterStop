# ShutterStop
ShutterStop is a photography sharing app that enables commmunity interactions between photographers. It was inspired by 500px. The backend uses Ruby on Rails and PostgreSQL, while the frontend uses React and Redux. I built the project over a ten day period and plan on adding more features in the future.

[Live Demo](https://shutter-stop.herokuapp.com/)

## Features
* User authentication using BCrypt encryption on the backend
* Users can add photos, update photo information and delete photos
* Following and unfollowing populatings an personal feed
* Like functionality on both the index and show pages for photos
* Comment section with delete functionality

## Drag n Drop File Upload

![alt text](https://raw.githubusercontent.com/jrswanson/ShutterStop/master/markdown-files/New%201.png "Dragging Animation")
```javascript
<div className={this.state.drag}
onDragOver={e => e.preventDefault()}
onDragLeave={this.handleDragLeave}
onDrop={this.handleDrop}></div>
<div className='modal-background'
    onDragEnter={this.handleDragEnter}
    onClick={() => this.props.clearModal()}>
    <div className='modal-child' onClick={e => e.stopPropagation()}>
        <div className='select-photo'>
            <label className='new-pic-button'>
                Select Photo
                <input type='file'
                    onChange={this.handleFile} />
            </label>
            <p>Or drag & drop a photo anywhere on this page</p>
        </div>
    </div>
</div>
```
![alt text](https://raw.githubusercontent.com/jrswanson/ShutterStop/master/markdown-files/New%202.png "New File Form")

## Dynamic Photo Manager

![alt text](https://raw.githubusercontent.com/jrswanson/ShutterStop/master/markdown-files/Update%201.png "No Selection")
![alt text](https://raw.githubusercontent.com/jrswanson/ShutterStop/master/markdown-files/Update%202.png "Selection Opens Form")
