import React from "react"
import { handleDragStart } from "./event.js"

function deleteNote(prop)
{
	prop.list[prop.listSetFunctionName]((notes)=>{
		notes = notes.filter((note)=>note.id !== prop.id)
		return notes
	})
	prop.list["setPiece"]((piece)=>piece - 1)
}
function AddNoteComponent(prop)
{
	return (<div key={prop.id} onDragStart={(event) => handleDragStart(event,prop.id,prop.listName,prop.listSetFunctionName,prop.innerRef)} draggable="true" className="quote-container" >
			<i className="pin"></i>
			<i 
				className="delete"
				onClick={(event)=>{deleteNote(prop)}}
			>
			</i>
			<div 
				className="note-container yellow">
				<textarea 
					value={prop.content} 
					onChange={(e) => prop.updateContent(prop.listSetFunctionName, prop.id, e.target.value)}  className="note yellow">
				</textarea>
				<cite 
					className="author">Author:
					<textarea 
						value={prop.author} 
						className="author-input" 
						onChange={(e) => prop.updateAuthor(prop.listSetFunctionName, prop.id, e.target.value)}
						maxLength={20}
					>
					</textarea>
				</cite>
			</div>
		</div>
	)
}
export {AddNoteComponent,deleteNote}