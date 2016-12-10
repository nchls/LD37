import React from 'react';

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
					phaserController.initializeRoom(el, this.props.roomState);
				} }>
				room
			</div>
		);
	}
}

class RoomData extends React.Component {
	render() {
		return (
			<div className="room-data">room data</div>
		);
	}
}

class Towers extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className="towers">
				<ul>
					{ this.props.towers.map( (tower) => {
						return <li>{ tower.type }</li>
					} ) }
				</ul>
			</div>
		);
	}
}

class Attackers extends React.Component {
	render() {
		return (
			<div className="attackers">attackers</div>
		);
	}
}
