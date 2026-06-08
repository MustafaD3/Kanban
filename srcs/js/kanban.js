import React, { useRef } from "react"
import ReactDOM from "react-dom/client"
import { handleDragStart,handleDragOver, dragNoteComponent } from "./event.js"
import { AddNoteComponent, deleteNote } from "./note.js"                  
const rootEl = document.getElementById("root")
const rootR = ReactDOM.createRoot(rootEl)
const exportJSON = (list,exportJSONref) => {
    const data = {
        todos: list.todos,
        inProgresses: list.inProgresses,
        dones: list.dones
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
	exportJSONref.current.href = url
	exportJSONref.current.click()
	setTimeout(() => URL.revokeObjectURL(url), 100)
}

function useList()
{       
	const [todos,setTodos] = React.useState([])
	const [inProgresses,setInProgresses] = React.useState([])
	const [dones,setDones] = React.useState([])                             
	const [piece,setPiece] = React.useState(0)
	return {
		todos,setTodos,
		inProgresses,setInProgresses,
		dones,setDones,
		piece,setPiece
	}
}

function Kanban()
{
	const list = useList()
	const addTodo = ()=>{
		list.setPiece(piece => piece + 1)
		const todo = {
			id:Date.now(),
			content:"",
			author:""
		}
		list.setTodos([...list.todos,todo])
	}
	const updateContent = (listName, id, value) => {
		list[listName](notes => 
			notes.map(note => 
				note.id === id ? { ...note, content: value } : note
			)
		)
	}
	const updateAuthor = (listName, id, value) => {
		list[listName](notes => 
			notes.map(note => 
				note.id === id ? { ...note, author: value } : note
			)
		)
	}
	const draggedId = useRef(null)
	const exportJSONref = useRef(null)
	return (
	<>
	<button class="button"
	onClick={addTodo}>
	Add Todo
	</button>
	<a 
		class="button"          
		ref={exportJSONref}
		onClick={(event)=>exportJSON(list,exportJSONref)}
		download={"kanban.json"}
	>
		Export JSON
	</a>
	<p style={{fontFamily:"sans-serif"}}>Note Piece:{list.piece}</p>
	<div id="kanban">
		<section 
		id="todo" 
		className="kanban-section" 
		onDragOver={handleDragOver} 
		onDrop={(event)=>{dragNoteComponent(event,list,"setTodos",draggedId)}}>
			<span>To Do</span>
			<div 
				className="message-container"
			>
				{list.todos.map((note)=>{
					return <AddNoteComponent 
						updateAuthor={updateAuthor} 
						author={note.author} 
						list={list} 
						updateContent={updateContent} 
						content={note.content} 
						listSetFunctionName="setTodos" 
						listName="todos" 
						innerRef={draggedId} 
						key={note.id} 
						id={note.id}
					/>
				})}
			</div>
		</section>
		<section
			id="in-progress" 
			className="kanban-section" 
			onDragOver={handleDragOver} 
			onDrop={(event)=>{dragNoteComponent(event,list,"setInProgresses",draggedId)}}
		>
			<span>In Progress</span>
			<div 
				className="message-container"
			>
				{list.inProgresses.map((note)=>{
					return <AddNoteComponent 
						updateAuthor={updateAuthor}
						author={note.author} 
						list={list} 
						updateContent={updateContent} 
						content={note.content} 
						listSetFunctionName="setInProgresses" 
						listName="inProgresses" 
						innerRef={draggedId} 
						key={note.id} 
						id={note.id}
					/>
				})}
			</div>
		</section>
		<section 
			id="dones" 
			className="kanban-section" 
			onDragOver={handleDragOver} 
			onDrop={(event)=>{dragNoteComponent(event,list,"setDones",draggedId)}}
		>
			<span>Done</span>
			<div 
				className="message-container"
			>
			{list.dones.map((note)=>{
				return <AddNoteComponent 
					updateAuthor={updateAuthor} 
					author={note.author} list={list} 
					updateContent={updateContent} 
					content={note.content} 
					listSetFunctionName="setDones" 
					listName="dones" 
					innerRef={draggedId} 
					key={note.id} 
					id={note.id}
				/>
			})}
			</div>
		</section>
	</div>
	</>
	)
}
rootR.render(<Kanban />)
