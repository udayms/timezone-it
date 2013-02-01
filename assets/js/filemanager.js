var FileManager = {
		
	fs: {},

    ANDROID_FOLDER: '/Android/data/com.hp.pss1.checkin/fixtures/',

    init: function(){
        this.initFileSystem();
    },

    initFileSystem: function(){
        log.info("Requesting FileSystem access.");  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.gotFileSystem, this.fail);
    }, 

    gotFileSystem: function(fs){
    	log.info("Got FileSystem access.");
        this.fs = fs;
        fireEvent("fsready", window, this.fs);
        
    }, 
    
    fileReadError: function(e){
        log.error('Error fetching file. =====> ' + JSON.stringify(e));
    }, 

    getFile: function(fs, filename){
        log.info("Looking for the file - " + filename + "in \"" + this.ANDROID_FOLDER + "\".");   
        fs.root.getFile(filename, {create: false}, gotFile, fail);
    }, 

    gotFile: function(fileEntry){
        log.info("Got the file....");
        fileEntry.file(readFile, fail);
    }, 

    readFile: function(file){
        var reader = new FileReader();
        reader.onloadend = fileReadComplete;
        reader.readAsText(file);  
    }, 

    fileReadComplete: function(event){
        log.info("Read file as text");

        fireEvent("fileread", window, event.target.result);
    },

    createFileWriter: function(fe){
        fe.createWriter(writeFile, fail);
    },

    writeFile: function(file){
        file.onwrite = function(evt) {
            log.info("write success - " + file.size + " kb.");
        };
        file.seek(file.length);
        file.write("udayms");
    }, 

    fail: function(errorevent){
        log.error("Read Failed!");
        log.error(errorevent.target.error.code);
    }

};