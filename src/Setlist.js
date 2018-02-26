import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { Dropdown } from 'semantic-ui-react';
const axios = require('axios');
const songs = require('./songs.json')

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, accordion) => ({
  textAlign: 'center',
  fontSize: '2rem',
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,
  boxShadow: '2px 2px 2px lightgrey',

  background: accordion ? 'yellow' : 'white',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  border: '1px solid lightgrey',
  padding: grid,
});

class Setlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: songs
    })
    axios
      .get('/songs')
      .then(res =>{
        console.log(res)
      })
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render() {
    return (
      <div className="ui text container">
        <div id="content">
          <DragDropContext  onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="ui unstackable items"
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} className="item">
                    {(provided, snapshot) => (
                      <div className="middle aligned subheader">
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item.hasAccordion
                          )
                        }
                        >
                          {item.title}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      </div>
    );
  }
}

export default Setlist;
