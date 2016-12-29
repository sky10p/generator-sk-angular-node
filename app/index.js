var Generator=require('yeoman-generator');

module.exports=class extends Generator{
	copyFiles(){
		this.fs.copyTpl(
			this.sourceRoot(),
			this.destinationRoot()
			);
	}

	dependencies(){
		this.installDependencies();
	}
}