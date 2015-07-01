import {PropTypes, DOM, Component} from 'react'
const {li} = DOM

import {DragSource, DropTarget} from 'react-dnd'
import {getEmptyImage} from 'react-dnd/modules/backends/HTML5'

const LIST_ITEM = 'list-item'

const dragSourceSpec = {
	beginDrag(props, monitor, component) {
		return {
			component, // used to get the last index while still hovering
			index: props.index, // original index from where the drag event originated
		}
	},
	endDrag(props, monitor) {
		const {index: sourceIndex} = monitor.getItem()
		const {index: targetIndex} = props

		// Reset order if droped outside of any drop target
		if (sourceIndex !== targetIndex && !monitor.didDrop()) {
			props.onMove(targetIndex, sourceIndex)
		}
	},
}

const dropTargetSpec = {
	hover(props, monitor) {
		const sourceIndex = monitor.getItem().component.props.index
		const targetIndex = props.index

		if (sourceIndex !== targetIndex) {
			props.onMove(sourceIndex, targetIndex)
		}
	},
	drop(props, monitor) {
		const sourceIndex = monitor.getItem().index
		const targetIndex = props.index

		if (sourceIndex !== targetIndex) {
			props.onDrop()
		}
	},
}

@DragSource(LIST_ITEM, dragSourceSpec, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))

@DropTarget(LIST_ITEM, dropTargetSpec, (connect) => ({
	connectDropTarget: connect.dropTarget(),
}))

export default class SortableListItem extends Component {
	static displayName = 'SortableListItem'

	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,

		onMove: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired,
	}

	static defaultProps = {
		dragBeginWithMouseDown: true,
	}

	constructor(props) {
		super(props)

		this.props.connectDragPreview(getEmptyImage(), {captureDraggingState: true})
	}

	render() {
		const {text, connectDragSource, connectDropTarget, isDragging} = this.props

		let className = 'sortable-list__item tooltip--show tooltip--right'

		if (isDragging) className += ' sortable-list__item--dragging'

		return (
			connectDragSource(
				connectDropTarget(
					li({className}, text)
				),
				{
					dropEffect: 'move',
				}
			)
		)
	}
}
