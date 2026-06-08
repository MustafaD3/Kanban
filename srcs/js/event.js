function handleDragStart(event,noteId,listName,listSetFunctionName,ref)           
{
	ref.current = {noteId,listName,listSetFunctionName}                              
}
function handleDragOver(event)
{
	event.preventDefault();
}          
function dragNoteComponent(event,list,listName,ref)
{
	const listNameRegex = /^set/
	event.preventDefault();
	const getDraggedNote = list[ref.current.listName].find(n => n.id === ref.current.noteId)
	if(listName === ref.current.listSetFunctionName) return
	list[listName](notes => [...notes,getDraggedNote])      
	list[ref.current.listSetFunctionName](notes => {
		notes = notes.filter(note => note.id !== getDraggedNote.id)
		return notes
	})
}
export {handleDragStart,handleDragOver,dragNoteComponent}