import {PropTypes, Component, DOM, createFactory} from 'react'
const {div, h5, ol} = DOM

import SortableListItem from './SortableListItem'

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd/modules/backends/HTML5'

@DragDropContext(HTML5Backend)
export default class SortableList extends Component {
	static displayName = 'SortableList'

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
		})).isRequired,
		itemElement: PropTypes.func,
		title: PropTypes.string,
		translate: PropTypes.func,
		onChange: PropTypes.func.isRequired,
	}

	static defaultProps = {
		items: [],
		itemElement: createFactory(SortableListItem),
		translate: key => key,
	}

	state = {
		items: this.props.items,
	}

	constructor(props) {
		super(props)

		this.onMove = this.onMove.bind(this)
		this.onDrop = this.onDrop.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({items: nextProps.items})
	}

	onMove(sourceIndex, targetIndex) {
		const {items} = this.state

		const newItems = items.slice(0)
		newItems[sourceIndex] = newItems.splice(targetIndex, 1, newItems[sourceIndex])[0]

		this.setState({items: newItems})
	}

	onDrop() {
		const {items} = this.state

		this.props.onChange(items)
	}

	render() {
		const {title, translate, itemElement} = this.props
		const {items} = this.state

		return div( null,
			h5( null, title ? title : null ),
			ol({className: 'select-list sortable-list'},
				items.map((item, index) => {
					return itemElement({
						...item,
						index,
						translate,
						onMove: this.onMove,
						onDrop: this.onDrop,
					})
				})
			)
		)
	}
}
