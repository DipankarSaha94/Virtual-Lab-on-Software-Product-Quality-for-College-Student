function update() {
	var shouldShow = !editor.session.getValue().length;
	var node = editor.renderer.emptyMessageNode;
	if (!shouldShow && node) {
		editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
		editor.renderer.emptyMessageNode = null;
	} else if (shouldShow && !node) {
		node = editor.renderer.emptyMessageNode = document.createElement("div");
		node.textContent = "Add HTML here (and JS inside SCRIPT tag)..."
		node.className = "ace_emptyMessage"
		node.style.padding = "0 9px"
		node.style.position = "absolute"
		node.style.zIndex = 9
		node.style.opacity = 0.5
		editor.renderer.scroller.appendChild(node);
	}
	var shouldShow2 = !editor2.session.getValue().length;
	var node2 = editor2.renderer.emptyMessageNode;
	if (!shouldShow2 && node2) {
		editor2.renderer.scroller.removeChild(editor2.renderer.emptyMessageNode);
		editor2.renderer.emptyMessageNode = null;
	} else if (shouldShow2 && !node2) {
		node2 = editor2.renderer.emptyMessageNode = document.createElement("div");
		node2.textContent = "Add CSS here..."
		node2.className = "ace_emptyMessage"
		node2.style.padding = "0 9px"
		node2.style.position = "absolute"
		node2.style.zIndex = 9
		node2.style.opacity = 0.5
		editor2.renderer.scroller.appendChild(node2);
	}

	var res = document.getElementById('result').contentWindow.document;
	res.open();
	res.write(editor.getValue());
	res.write('<style>'+editor2.getValue()+'</style>');
	res.close();
}
var editor = ace.edit("editor");
editor.setTheme("ace/theme/clouds");
editor.session.setMode("ace/mode/html");
//editor.session.addMarker(new Range(1, 0, 1, 20), "rigid", "fullLine", true);

var editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/clouds");
editor2.session.setMode("ace/mode/css");
//editor2.session.addMarker(, "readonly-highlight", "fullLine", true);

editor.getSession().on('change', function() {
	update();
});
editor2.getSession().on('change', function() {
	update();
});
var Range = ace.require('ace/range').Range;
editor.commands.on("exec", function(e) { 
	var rowCol = editor.selection.getCursor();
	if ((rowCol.row <= 5) || ((rowCol.row + 1) == editor.session.getLength()) || ((rowCol.row + 2) == editor.session.getLength())) {
		e.preventDefault();
		e.stopPropagation();
	}
});
editor2.commands.on("exec", function(e) { 
	var rowCol = editor2.selection.getCursor();
	if ((rowCol.row <= 4)) {
		e.preventDefault();
		e.stopPropagation();
	}
});
update();
editor.session.addMarker(new Range(1, 0, 5, 0), "readonly-highlight", "fullLine");
editor2.session.addMarker(new Range(1, 0, 4, 0), "readonly-highlight", "fullLine");
//editor.session.addMarker(new Range(editor.session.getLength() - 2, 0, editor.session.getLength() - 1, 0), "readonly-highlight", "fullLine");
