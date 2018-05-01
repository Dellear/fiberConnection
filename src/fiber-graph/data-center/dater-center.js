import Board from '../module/board.js';
import Link from '../module/link.js';

class DataCenter{
	constructor(options){
		this.options = options;

		this.boardMap = {};
		this.linkMap = {};

		this.initData();

	}

	initData(){

		if (this.options.boards && this.options.boards.length) {
			const boards = this.options.boards;
			for (let i = 0; i < boards.length; i++) {

				const boardObj = new Board(boards[i]);
				this.boardMap[boards[i].id] = boardObj;
			}

		}

		if (this.options.links && this.options.links.length) {
			const links = this.options.links;
			for (let j = 0; j < links.length; j++) {
				const linkObj = new Link();
				linkObj.id = `${links[j].src}_${links[j].snk}`;
				linkObj.src = this.boardMap[links[j].src];
				linkObj.snk = this.boardMap[links[j].snk];
				linkObj.srcX = this.boardMap[links[j].src].x;
				linkObj.srcY = this.boardMap[links[j].src].y;
				linkObj.snkX = this.boardMap[links[j].snk].x;
				linkObj.snkY = this.boardMap[links[j].snk].y;
				this.linkMap[`${links[j].src}_${links[j].snk}`] = linkObj;
			}
		}

	}
}

export default DataCenter;