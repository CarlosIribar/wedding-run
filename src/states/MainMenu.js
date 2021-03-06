import PoppingHeartAnimation from 'animations/PoppingHeart';
import Menu from 'objects/Menu';
import SoundControl from 'objects/SoundControl';

class MainMenu extends Phaser.State {

	create() {		
		// Set the game background colour
		this.game.stage.backgroundColor = '#aaae9e';
		this.game.renderer.renderSession.roundPixels = true;

		this.createHeader();
		this.createFooter();

	   	let mainMenuOptions = {
	   		'title' : 'Ayuda a Yhubert y Mariana a llegar al altar'
	   		,'items' : [
	    		{
					'label'    : 'Jugar'
					,'callback': _.bind(this.choosePlayer,this)
	    		}
	    		,{
					'label'    : 'High scores'
					,'callback': _.bind(this.showHighScores,this)
	    		}
	    		,{
					'label'    : 'Creditos'
					,'callback': _.bind(this.showCredits,this)
	    		}
	    	]	   	    	
	   	}
    	this.mainMenu = new Menu(mainMenuOptions,this.game);
    	this.playerMenu = null;

    	// Sound related stuff
    	this.soundControl = new SoundControl(this.game);
    	this.music = this.game.add.audio('menu',this.game.Settings.musicVolume,true);
    	this.music.play();
    }

    choosePlayer() {
    	this.mainMenu.destroy();
    	let playerMenuOptions = {
			'title' : '- elige el jugador -'
			,'items': [
	    		{
					'label'    : 'Yhubert'
					,'callback': _.bind(function(){
						this.game.Settings.characterType = 'groom';
						this.chooseName();
					},this)
	    		}
	    		,{
					'label'    : 'Mariana'
					,'callback': _.bind(function(){
						this.game.Settings.characterType = 'bride';
						this.chooseName();
					},this)
	    		}
    		]
    	};    	
    	this.playerMenu = new Menu(playerMenuOptions,this.game);
    }

    chooseName() {
    	// Destroy prevoius menu
    	this.playerMenu.destroy();

    	let inputWidth = 200;
    	var input = this.game.add.inputField(this.game.width/2-inputWidth/2, 250,{
		    font: '30px arcade',
		    fill: '#212121',
		    width: inputWidth,
		    padding: 10,
		    borderWidth: 3,
		    borderColor: '#0b77a5',
		    borderRadius: 4,
		    placeHolder: 'Escribe tu nombre',
		});
		input.setText(this.game.Settings.playerName);
		input.startFocus();

		var inputLabel = this.game.add.text(this.game.width/2, 230,'- Escribe tu nombre y presiona ENTER -');
	    inputLabel.anchor.set(0.5);
	    inputLabel.align = 'center';
	    inputLabel.font = 'arcade';
	    inputLabel.fontSize = 25;
	    inputLabel.fill = '#FFFFFF';

	    var nameDescription = this.game.add.text(this.game.width/2, 340,'Esto es opcional');
	    nameDescription.anchor.set(0.5);
	    nameDescription.align = 'center';
	    nameDescription.font = 'arcade';
	    nameDescription.fontSize = 25;
	    nameDescription.fill = '#504c39';

	    // Register 
	    this.game.input.keyboard.onUpCallback = _.bind(function(e){
			if(e.keyCode == Phaser.Keyboard.ENTER) {
	    		this.game.Settings.playerName = input.value;
				this.startGame();
			}
		},this);
    }

    showCredits() {
    	this.state.start('Credits');
    }

    showHighScores() {
    	this.state.start('HighScores');
    }

    startGame() {
    	this.state.start('Main');
    }

	shutdown() {
		this.mainMenu.destroy();
		this.music.destroy();
	}

	createHeader() {
		var headerOffset = 80;

		// Create left hearth and animate it
		let leftHeart = this.game.add.sprite(this.game.width/2-150, headerOffset+5, 'heart');
		let leftHeartAnimation = new PoppingHeartAnimation(leftHeart,this.game).animate();

		// Create right hearth and animate it
		let rightHeart = this.game.add.sprite(this.game.width/2+110, headerOffset+5, 'heart');
		let rightHearthAnimation = new PoppingHeartAnimation(rightHeart,this.game).animate();

		// Add bride and groom images to the logo
		var bride = this.game.add.image(this.game.width/2-170, headerOffset-35, 'brideLarge');
		var groom = this.game.add.image(this.game.width/2+100, headerOffset-35, 'groomLarge');

		// Add WEDDING text
		var weddingText = this.game.add.text(this.game.width/2, headerOffset,'NOS');
	    weddingText.anchor.set(0.5);
	    weddingText.align = 'center';
	    weddingText.font = 'arcade';
	    weddingText.fontSize = 120;
	    weddingText.fill = '#f0d6d0';

		// Add RUN text
	    var weddingText = this.game.add.text(this.game.width/2-1, headerOffset + 56,'CASAMOS');
	    weddingText.anchor.set(0.5);
	    weddingText.align = 'center';
	    weddingText.font = 'arcade';
	    weddingText.fontSize = 55;
	    weddingText.fill = '#f0d6d0';
	}

	createFooter() {

		var firstLine = "12-03-2021";
		var secondLine = "copyright © 2021 - ciribar - Music by Hunor Sukosd";
	    var footerHeight = 80;
		
	    var graphics = this.game.add.graphics(0, 0);
	    graphics.beginFill(0x756f73);    
	    graphics.lineStyle(2, 0x756f73, 1);
	    graphics.drawRect(0, this.game.world.height-footerHeight, this.game.width, footerHeight);
	    graphics.endFill();


		var firstLineText = this.game.add.text(this.game.width/2, this.game.world.height-footerHeight+30,firstLine);
	    firstLineText.anchor.set(0.5);
	    firstLineText.align = 'center';
	    firstLineText.font = 'arcade';
	    firstLineText.fontSize = 20;
	    firstLineText.fill = '#FFFFFF';
	    firstLineText.strokeThickness = 0;

	    var secondLineText = this.game.add.text(this.game.width/2, this.game.world.height-footerHeight+50,secondLine);
	    secondLineText.anchor.set(0.5);
	    secondLineText.align = 'center';
	    secondLineText.font = 'arcade';
	    secondLineText.fontSize = 20;
	    secondLineText.fill = '#FFFFFF';
	    secondLineText.strokeThickness = 0;
	}
}

export default MainMenu;
