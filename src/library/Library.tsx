import { Component, createRef, RefObject } from 'react'
import { openGameUrl } from '..'

export default class Library extends Component {
    apps: any[] = []
    componentDidMount() {
        fetch(`https://discord.com/api/v9/users/@me/library`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')!
            }
        })

        fetch(`https://discord.com/api/v9/applications/detectable`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')!
            }
        }).then(value => 
            value.json()
        ).then(apps => {
            if (!Array.isArray(apps)) return
            this.apps = apps
            console.log(apps)
        })
    }

    render() {
        return (
            <div style={{
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 50,
                paddingBottom: 50,
                overflow: 'auto'
            }}>
                <Game name="Mini Motorways" type="steam" id="1127500"/>
                <Game name="Among Us" type="steam" id="945360"/>
                <Game name="Need for Speed™ Payback" type="origin" id="193632" icon="1042195_LB_231x326_en_US_%5E_2017-05-23-18-38-43_0013d0e637cb8cd32350c8d0839ff423db6f476d"/>
                <Game name="GTA V" type="windows" id="D:\\Program Files\\Rockstar Games\\Grand Theft Auto V\\GTA5.exe" icon="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Fdisp%2F035e5912317673.562666e58b958.jpg&f=1&nofb=1"/>
                <Game name="Rocket League" type="epicgames" id="" icon="https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_OfferPortraitImage_1200x1600_1200x1600-b5dd3a57c63f33d7a2831993327dcc21?h=330&resize=1&w=220"/>
            </div>
        )
    }
}

type GameLauncherType = 'steam' | 'origin' | 'windows' | 'epicgames' | 'minecraft'

type GameProps = {
    name: string
    type: GameLauncherType
    id: string
    icon?: string
}

class Game extends Component<GameProps, { hover: boolean }> {
    ref: RefObject<any>

    imageUrl: string
    gameUrl: string

    constructor(props: GameProps) {
        super(props)
        this.ref = createRef()
        this.state = {
            hover: false
        }

        switch (this.props.type) {
        case 'steam':
            this.imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${this.props.id}/library_600x900_2x.jpg`
            this.gameUrl = `steam://run/${this.props.id}`
            break
        case 'origin':
            this.imageUrl = `https://originassets.akamaized.net/origin-com-store-final-assets-prod/${this.props.id}/231.0x326.0/${this.props.icon}.jpg`
            this.gameUrl = `origin2://game/launch/?offerIds=${this.props.id}`
            break
        case 'windows':
            this.imageUrl = this.props.icon ?? ''
            this.gameUrl = this.props.id
            break
        case 'epicgames':
            this.imageUrl = this.props.icon ?? ''
            this.gameUrl = this.props.id
            break
        case 'minecraft':
            this.imageUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mobygames.com%2Fimages%2Fcovers%2Fl%2F489736-minecraft-windows-apps-front-cover.jpg&f=1&nofb=1'
            this.gameUrl = `java -jar`
            break
        }
    }

    _setStyle() {
        const hover = this.state.hover
        this.ref?.current.setAttribute('style', `
        background-image: 
            linear-gradient(150deg, #ffffff3f, transparent, transparent, transparent, #000000af), 
            url(${this.imageUrl}); 
        background-size: ${!hover ? '220px 330px' : '236px 354px'};
        filter: saturate(120%);
        width: ${!hover ? '220px' : '236px'};
        height: ${!hover ? '330px' : '354x'};
        margin: ${!hover ? '10px 20px 20px 10px' : '10px 12px 7px 2px'};
        ${hover ? 'box-shadow: 0 0 5px 1px gray' : ''};
        `)
    }

    componentDidMount() { this._setStyle() }
    componentDidUpdate() { this._setStyle() }

    render() {
        return (
            <div
            className="Game"
            ref={this.ref}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            onClick={() => { openGameUrl(this.gameUrl) }}
            >
                <svg width="32" height="32" viewBox={launcherLogoVieyBoxes[this.props.type]} version="1.1" preserveAspectRatio="xMidYMid" style={{ 
                    marginLeft: this.state.hover ? 188 : 180,
                    marginRight: 8,
                    marginTop: 290
                }}><g>
                    {launcherLogos[this.props.type]}
                </g></svg>
            </div>
        )
    }   
}


const launcherLogos = {
    steam: <path d="M127.778579,0 C60.4203546,0 5.24030561,52.412282 0,119.013983 L68.7236558,147.68805 C74.5451924,143.665561 81.5845466,141.322185 89.1497766,141.322185 C89.8324924,141.322185 90.5059824,141.340637 91.1702465,141.377541 L121.735621,96.668877 L121.735621,96.0415165 C121.735621,69.1388208 143.425688,47.2457835 170.088511,47.2457835 C196.751333,47.2457835 218.441401,69.1388208 218.441401,96.0415165 C218.441401,122.944212 196.751333,144.846475 170.088511,144.846475 C169.719475,144.846475 169.359666,144.83725 168.99063,144.828024 L125.398299,176.205276 C125.425977,176.786507 125.444428,177.367738 125.444428,177.939743 C125.444428,198.144443 109.160732,214.575753 89.1497766,214.575753 C71.5836817,214.575753 56.8868387,201.917832 53.5655182,185.163615 L4.40997549,164.654462 C19.6326942,218.967277 69.0834655,258.786219 127.778579,258.786219 C198.596511,258.786219 256,200.847629 256,129.393109 C256,57.9293643 198.596511,0 127.778579,0 Z M80.3519677,196.332478 L64.6033732,189.763644 C67.389592,195.63131 72.2239585,200.539484 78.6359521,203.233444 C92.4932392,209.064206 108.472481,202.430791 114.247888,188.435116 C117.043333,181.663313 117.061785,174.190342 114.294018,167.400086 C111.526251,160.609831 106.295171,155.31417 99.5879487,152.491048 C92.9176301,149.695603 85.7767911,149.797088 79.5031858,152.186594 L95.777656,158.976849 C105.999942,163.276114 110.834309,175.122157 106.571948,185.436702 C102.318812,195.751247 90.574254,200.631743 80.3519677,196.332478 Z M202.30901,96.0424391 C202.30901,78.1165345 187.85204,63.5211763 170.092201,63.5211763 C152.323137,63.5211763 137.866167,78.1165345 137.866167,96.0424391 C137.866167,113.968344 152.323137,128.554476 170.092201,128.554476 C187.85204,128.554476 202.30901,113.968344 202.30901,96.0424391 Z M145.938821,95.9870838 C145.938821,82.4988323 156.779242,71.5661525 170.138331,71.5661525 C183.506646,71.5661525 194.347066,82.4988323 194.347066,95.9870838 C194.347066,109.475335 183.506646,120.408015 170.138331,120.408015 C156.779242,120.408015 145.938821,109.475335 145.938821,95.9870838 Z" fill="currentColor"></path>,
    origin: <path d="M127.615795,2.37396105 C128.316104,4.17579665 127.105155,5.82443974 126.113051,7.21776199 C119.08808,17.1752744 113.565286,28.3102833 111.362232,40.2811829 C110.500866,42.7381045 110.691102,44.5685497 111.362232,44.7728064 C124.996364,43.576446 140.374543,43.7140513 153.797123,46.5809395 C178.220385,51.4976892 201.046067,63.8552175 218.590256,81.5234192 C236.083381,99.0092488 248.360665,121.667149 253.328479,145.908039 C258.836114,172.15502 255.757675,200.094414 244.742404,224.53956 C221.384195,274.45843 182.006429,316.681201 133.82374,343.446118 C132.269931,344.168312 130.030402,344.197492 128.96535,342.650977 C127.710629,341.031513 128.228565,338.726331 129.468695,337.252765 C135.968434,328.185227 140.50585,317.760843 142.97152,306.891471 C143.445688,304.637352 144.094932,302.354055 143.89797,300.034283 C143.102829,298.99841 141.78975,299.31209 140.673633,299.348564 C117.286244,301.690221 93.2204323,297.510254 72.0871623,287.180702 C49.4511468,276.274855 30.2437253,258.446166 17.5433376,236.773075 C5.77669476,216.836165 -0.409364314,193.616559 0.0210336979,170.455313 C0.101277286,149.198029 5.90070774,128.115824 16.113541,109.506582 C39.8875579,63.8625124 77.2154636,25.3455411 122.283238,0.462702249 C124.172612,-0.587760605 126.966551,0.192791655 127.615795,2.37396105 L127.615795,2.37396105 Z M120.970159,122.440406 C107.058821,124.307896 94.2271262,132.478162 86.4361931,144.120792 C81.1619942,152.115982 77.9668364,161.613917 78.0324904,171.22857 C77.6385667,184.11133 82.7741629,197.015974 91.6739175,206.295063 C99.4502601,214.669586 110.253979,220.126157 121.582929,221.585133 C133.116136,223.109763 145.159985,220.410657 154.92783,214.071405 C164.856163,207.768628 172.420955,197.818411 175.80578,186.547821 C182.15962,166.982949 174.543765,144.062434 157.969796,131.974816 C147.560001,124.052575 133.911279,120.536442 120.970159,122.440406 L120.970159,122.440406 L120.970159,122.440406 Z" fill="currentColor"></path>,
    windows: <path d="M0 14L0 28L28 28L28 0L0 0L0 14ZM30 14L30 28L58 28L58 0L30 0L30 14ZM0 44L0 58L28 58L28 30L0 30L0 44ZM30 44L30 58L58 58L58 30L30 30L30 44Z" fill="currentColor"></path>,
    epicgames: <><path fill="currentColor" d="M250.8.9H25C6.8.9 0 7.7 0 26v220.9c0 2.1.1 4 .3 5.8.4 4 .5 7.9 4.2 12.3.4.4 4.2 3.3 4.2 3.3 2 1 3.4 1.7 5.7 2.7l111.1 46.6c5.8 2.6 8.2 3.7 12.4 3.6 4.2.1 6.6-.9 12.4-3.6L261.4 271c2.3-.9 3.7-1.7 5.7-2.7 0 0 3.8-2.8 4.2-3.3 3.7-4.4 3.8-8.3 4.2-12.3.2-1.8.3-3.7.3-5.8V26c0-18.3-6.7-25.1-25-25.1"/><path fill="#000" d="M235.6 223l-.1.5-.1.6-.1.5-.2.5-.1.5-.2.5-.2.5-.2.4-.2.5-.3.4-.3.4-.3.4-.3.4-.3.4-.4.4-.3.3-.4.4-.4.3-.4.3-.4.2-.4.3-.5.3-.5.2-.5.3-.5.2-.5.2-.5.2v-.1l-.5.2-.5.1-.9.2-.5.1-.5.1-.5.1-.5.1-.6.1-.5.1h-2l-.5-.1h-.6l-.5-.1-.5-.1-.6-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.2-.5-.1-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.3-.4-.3-.5-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.4.3-.4.4-.4.3-.4.4-.4.3-.4.3-.4.4-.4.3-.4.4-.4.3-.4.4-.4.3-.4.3-.4.4-.4.3-.4.4-.4.3-.4.4.3.5.3.4.3.5.3.4.3.5.3.4.3.5.2.4.3.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.1 1 .2.6.1.5.1h.5l.6.1h1.1l.6-.1.5-.1.5-.1.5-.1.4-.2.4-.2.4-.3.3-.4.2-.4.2-.5.1-.5v-.1l-.1-.6-.2-.5-.3-.4-.4-.3-.4-.3-.4-.2-.5-.2-.5-.2-.6-.3-.4-.1-.4-.1-.5-.2-.5-.1-.5-.2-.5-.1-.6-.2-.5-.1-.6-.2-.5-.1-.5-.2-.5-.1-.5-.2-.5-.2-.5-.1-.5-.2-.5-.2-.5-.2-.6-.2-.5-.2-.5-.2-.5-.2-.5-.3-.5-.3-.4-.3-.5-.3-.4-.3-.4-.3-.4-.3-.4-.4-.4-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.5-.2-.4-.2-.4-.1-.5-.2-.4-.1-.5-.1-.5-.1-.5-.1-.5-.1-.6v-1.2l.1-.5.1-.5.1-.5.1-.5.1-.5.2-.5.1-.5.2-.5.2-.5.2-.5.3-.5.3-.5.3-.4.3-.4.4-.4.4-.4.4-.4.4-.4.4-.3.4-.3.4-.3.4-.3.5-.3.5-.2.5-.3.5-.2.5-.2.5-.2.5-.2.4-.1.5-.1.5-.1.5-.1.5-.1.5-.1.5-.1.5-.1.5-.1h2.2l.6.1.6.1h.5l.6.1.5.1.6.1.5.1.5.1.5.1.5.1.5.1.5.2.5.2.5.1.5.2.5.2.5.2.5.2.5.2.5.3.4.2.5.3.5.3.4.3.5.3.4.3.4.3.4.3.4.3-.3.4-.3.4-.3.4-.3.4-.3.5-.3.4-.3.4-.3.4-.3.4-.3.4-.3.4-.3.4-.3.5-.3.4-.3.4-1 2.2-.3.4-.4-.3-.5-.3-.4-.3-.4-.3-.5-.2-.4-.3-.5-.2-.4-.2-.5-.2-.4-.2-.5-.2-.4-.2-.6-.2-.5-.2-.5-.2-.5-.1-.3.2-.5-.1-.5-.1-.5-.1-.5-.1h-1.1l-.6.1-.5.1-.5.1-.4.2-.4.2-.5.4-.3.5-.2.5-.1.5v.1l.1.7.2.6.2.3.4.4.5.3.4.3.5.2.6.2.6.2.4.1.4.2.5.1.5.2.5.1.6.2.6.2.6.2.6.1.5.2.6.2.5.1.5.2.5.2.5.2.5.2.5.2.5.1.6.2.5.3.5.2.5.3.5.3.5.3.4.3.4.3.4.3.4.4.4.4.4.4.4.4.3.4.3.5.3.4.3.5.2.4.2.5.1.5.1.5.2 1 .1.5.1.6v1.2l-.7-.6zm-35.5 10.2H171v-37.1h29.3v8.4h-19.6v6.1h17.6v7.9h-17.6v6.3h19.9v8.4h-.5zm-37.1 0h-9.3v-21.9l-.3.4-.3.5-.3.4-.3.4-.3.5-.3.4-.3.4-.3.5-.3.4-.3.4-.3.4-.3.5-.3.4-.3.4-.3.5-.3.4-.3.4-.3.5-.2.4-.3.4-.3.5-.3.4-.3.4-.3.5-.3.4-.2.4-.3.4-.3.5-.3.4-.3.4-.2.5-.3.4-.3.4-.3.5-.3.4h-.2l-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.2-.4-.3-.5-.3-.4-.3-.5.5-.5-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.3-.4-.2-.3-.3-.4-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.2-.3-.3-.5-.3-.4-.3-.5-.3-.4-.3-.5-.3-.4v21.8h-9.6V196H135l.3.4.3.5.3.4.3.5.3.4.3.5.3.4.3.5.3.4.3.4.3.5.3.4.3.5.3.4.3.5.3.4.3.4.3.5.3.4.3.5.3.4.3.5.3.4.2.5.3.4.2.4.3.5.3.4.3.5.3.4.2.5.3.4.3.5.3.4.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4.2-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.2-.4.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4.3-.5.3-.4h10.4v37.1l-2.3.1zm-58.8-15.3l-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5h8.6l.4-.5zm15.9 15.3h-9.9l-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5H92.8l-.2.5-.2.5-.2.5-.2.5-.2.5-.4.9-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.5h-10l.2-.5.4-.9.2-.5.2-.5.4-.9.2-.5.2-.5.2-.5.2-.3.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.4-.9.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.4-.9.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.1-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.4-.9.2-.5h9.4l.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.4.9.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.2.5.4.9-1-.4zm-44.4-4.8l-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.5.3-.5.3-.5.3-.5.2-.5.3-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.1-.5.1-.5.1-.5.1-.5.1-.6.1-.5.1-.6.1-.5.1-.6.1H59l-.5-.1-.6-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.1-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.2-.5-.3-.4-.2-.5-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.4-.4-.3-.4-.4-.4-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.2-.4-.3-.5-.3-.4-.2-.5-.2-.5-.2-.5-.2-.5-.2-.4-.2-.5-.1-.5-.2-.5-.1-.5-.2-.5-.1-.5v-.5l-.1-.5v-.5l-.1-.5V212.4l.1-.6.1-.5.1-.5.1-.5.2-.5.1-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.2-.5.3-.5.3-.4.2-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.4.4-.4.3-.4.4-.4.4-.4.4-.3.4-.4.4-.3.4-.3.4-.3.4-.3.4-.3.4-.3.5-.3.5-.3.5-.3.5-.2.5-.2.5-.3.4-.2.5-.2.5-.2.5-.1.5-.2.5-.1.5-.2.5-.1.5-.1.5-.1.5-.1.5-.1.5-.1.5-.1H61l.6.1.6.1h.5l.5.1.6.1.5.1.5.1.5.1.5.1.5.1.5.1.5.2.5.1.4.2.5.2.9.4.5.2.5.3.5.2.4.3.5.3.4.3.5.3.4.3.4.3.4.3.4.3.4.4.4.3-.3.4-.4.4-.3.4-.4.4-.3.4-.3.4-.4.4-.3.4-.3.4-.4.4-.3.4-.4.4-.3.4-.3.4-.4.4-.3.4-.4.4-.3.4-.4-.3-.4-.4-.4-.3-.4-.3-.4-.3-.4-.3-.4-.3-.5-.3-.4-.2-.4-.2-.4-.2-.5-.2-.5-.2-.5-.1-.5-.1-.5-.1-.5-.1-.6-.1-.6-.1h-1.1l-.5.1-.5.1-.5.1-.5.1-.5.2-.5.2-.4 1.2-.5.2-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.3.4-.4.4-.3.4-.3.4-.3.4-.2.5-.3.4-.2.5-.2.5-.2.5-.2.5-.1.5-.1.5-.1.6v3.7l.1.5.1.5.1.5.2.5.6-.2.2.5.2.5.3.5.5.8.3.4.3.4.4.4.3.4.4.3.4.3.4.3.4.3.4.3.5.2.5.2.5.2.5.2.5.2.5.1.5.1.5.1.6.1h.9l.6-.1.6-.1.5-.1.5-.1.5-.1.5-.1.5-.1.5-.2.4-.2.5-.2.4-.2.4-.3v-5h-7.4v-7.4H76v16.6l-.3.2zM59.4 112.2h22v-17h-22V60.5h22.9v-17H40.7v122.7h41.9v-17H59.4v-37m157.4 3.7v27.7c0 4.9-2.3 7.2-7 7.2h-3.5c-4.9 0-7.2-2.3-7.2-7.2V66.1c0-4.9 2.3-7.2 7.2-7.2h3.1c4.7 0 7 2.3 7 7.2v24h18.3V65c0-15.2-7.3-22.6-22.5-22.6h-9.1c-15.2 0-22.7 7.5-22.7 22.8v79.2c0 15.3 7.5 22.8 22.7 22.8h9.2c15.2 0 22.7-7.5 22.7-22.8v-28.6h-18.2M152 43.5h18.7v122.7H152V43.5zM124.9 98c0 4.9-2.3 7.2-7 7.2h-7.7V60h7.7c4.7 0 7 2.3 7 7.2V98zm-4-54.5H91.6v122.7h18.7v-44.5h10.6c15.2 0 22.7-7.5 22.7-22.8V66.3c0-15.3-7.5-22.8-22.7-22.8zM84.7 277.1h106.9l-54.5 18-52.4-18"></path></>,
    minecraft: <path d="M13.333 16h-2.666v-2.667H5.333V16H2.667V8h2.666V5.333h5.334V8h2.666v8zM10.667 0H16v5.333h-5.333V0zM0 0h5.333v5.333H0V0z"/>
}

const launcherLogoVieyBoxes = {
    steam: "0 0 256 259",
    origin: "0 0 256 344",
    windows: "0 0 62 62",
    epicgames: "0 0 276 322",
    minecraft: "0 0 16 16"
}