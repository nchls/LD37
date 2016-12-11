import React from 'react';
import normalize from 'normalize.css';

import phaserController from './phaserController';
import style from './style.less';

export default class App extends React.Component {
	componentWillMount() {
		this.setState({
			user: {
				username: 'aplomb',
				userLocation: 'Pownal, ME, USA'
			},
			money: 300,
			room: {
				layout: [
					'*****.....',
					'sppp*****.',
					'..*p*ppp**',
					'..*ppp*pp*',
					'.*******p*',
					'**ppppppp*',
					'*pp*******',
					'*p**pppp**',
					'*pppp**pp*',
					'********e.',
				],
				waves: [
					{
						waveNumber: 1,
						username: 'ZuesTheCat',
						userLocation: 'Brunswick, ME, USA'
					},
					{
						waveNumber: 2,
						username: 'Ravenaq',
						userLocation: 'Merrimack, NH, USA'
					},
					{
						waveNumber: 3,
						username: 'Bunnicula',
						userLocation: 'Somerville, MA, USA'
					},
					{
						waveNumber: 4,
						username: '2scary4u',
						userLocation: 'Eugene, OR, USA'
					},
					{
						waveNumber: 5,
						username: 'Kanto55',
						userLocation: 'Austin, TX, USA'
					},
					{
						waveNumber: 6,
						username: 'Mouse, Mickey Mouse',
						userLocation: 'Ft. Lauderdale, FL, USA'
					},
					{
						waveNumber: 7,
						username: 'Llewellyn',
						userLocation: 'Freedom, MO, USA'
					},
				]
			},
			towers: [
				{
					type: 'cannon',
					ammo: 1,
				},
				{
					type: 'fire',
					ammo: 2,
				},
				{
					type: 'water',
					ammo: 3,
				},
				{
					type: 'electric',
					ammo: 1,
				},
			],
			attackers: [
				'square',
				'circle',
				'triangle',
				'heavenly soccer ball',
			],
		});
	}

	render() {
		return (
			<div className="">
				<Towers {...this.state}/>
				<RoomData {...this.state}/>
				<Room {...this.state}/>
				<Attackers {...this.state}/>
			</div>
		);
	}
}

class Room extends React.Component {
	render() {
		return (
			<div 
				className="room" 
				id="room"
				ref={ (el) => { 
					phaserController.initializeRoom(el, this.props.room);
				} }>
				room
			</div>
		);
	}
}

class RoomData extends React.Component {
	render() {
		return (
			<div className="room-data">
				<table>
					<thead>
						<tr>
							<th>Wave</th>
							<th>Player</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.room.waves.map( (wave) => {
							return (
								<tr key={ wave.waveNumber }>
									<td>
										{ wave.waveNumber }
									</td>
									<td>
										<div className="username">
											{ wave.username }
										</div>
										{ wave.userLocation && (
											<div className="location">
												{ wave.userLocation }
											</div> 
										) }
									</td>
								</tr>
							);
						} ) }
					</tbody>
				</table>
			</div>
		);
	}
}

class Towers extends React.Component {
	render() {
		return (
			<div className="towers">
				<ul>
					{ this.props.towers.map( (tower, index) => {
						return <li key={ index }>
							<button>
								{ tower.type }
							</button>
						</li>
					} ) }
				</ul>
			</div>
		);
	}
}

class Attackers extends React.Component {
	render() {
		return (
			<div className="attackers">{ this.props.attackers.map( (attacker, index) => {
						return <li key={ index }>
							<button>
								{ attacker }
							</button>
						</li>
					} ) }</div>
		);
	}
}
