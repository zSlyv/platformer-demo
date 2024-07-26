//  el soporte es global
const config = {
    type: Phaser.AUTO, //AUTO (primero intenta con WebGL, luego canvas y así.), CANVAS, WEBGL, HEADLESS (no renderiza visualmente)
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game', //es el que se está llamando en el HTML
    physics: {
        default: 'arcade', //algunos valores por defecto de fisicas de phaser
        arcade: {
            gravity: {
                y: 300,
                // debug: true //para ver información
            }
        }
    },
    scene: {
        preload, //funcion para precargar recursos
        create, //para cuando el juego inicia
        update //se ejecuta en cada frame
    }
}

new Phaser.Game(config)

function preload () {
    // this es el juego que se está construyendo
    this.load.image (
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image (
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
    this.load.spritesheet (
        'mario',
        'assets/entities/mario.png',
        //framewidth es necesario para poder crear a partir de un spritesheet y se indica el tamaño de cada cuadricula, también se puede usar framwHeight para la altura
        { frameWidth: 18, frameHeight: 16 } 
    )
}

function create () {
    //esto va por posición x, y, idImagen
    this.add.image(100, 50, 'cloud1').setOrigin(0, 0).setScale(0.15)

    this.add.tileSprite(0, config.height, config.width, 32, 'floorbricks').setOrigin(0, 1)

    this.mario = this.add.sprite(50, 210, 'mario').setOrigin(0, 1)

    this.keys = this.input.keyboard.createCursorKeys()

    this.anims.create ({
        keys: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            {
                start: 1,
                end: 3 //genera desde el 1 hasta el 3, no 1 y 3
            }
        ),
        frameRate: 12, //cuanto dura cada frame
        repeat: -1 //-1 es infinito, se puede usar otros valores
    })

    this.anims.create ({
        keys: 'mario-idle',
        frames:[{ key: 'mario', frame: 1 }]
    })

    this.anims.create ({
        keys: 'mario-jump',
        frames:[{ key: 'mario', frame: 5 }]
    })
}
 
function update () {
    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
        this.mario.flipX = true
    }
    else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    }
    else {
        this.mario.anims.play('mario-idle', true)
    }

    if (this.keys.up.isDown) {
        this.mario.anims.play('mario-jump', true)
        this.mario.y -= 5
        this.mario.flipX = false
    }
}