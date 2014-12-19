define('ORCSCOEditor', ["ace/ace"], function(ace) {

	function ORCSCOEditor(editorParentDiv, csound, fileManager) {

		var that = this;
		
		this.orcScoContainer = document.createElement("div");
		this.orcScoContainer.id = "orcScoContainer";
		this.currentOrcFilePath = "";
		this.currentScoFilePath = "";
		this.orcEditorDiv = document.createElement("div");
		this.orcEditorDiv.id = "ORCEditor";

		this.orcBackDiv = document.createElement("div");
		this.orcBackDiv.id = "orcBack";
		this.orcBackDiv.innerHTML = ".ORC";
		this.scoEditorDiv = document.createElement("div");
		this.scoEditorDiv.id = "SCOEditor";

		this.scoBackDiv = document.createElement("div");
		this.scoBackDiv.id = "scoBack";
		this.scoBackDiv.innerHTML = ".SCO";
		function createEditor(editorDiv, orcDiv) { 

			var editor = ace.edit(editorDiv);
			editor.setTheme("ace/theme/github");
			editor.getSession().setMode("ace/mode/javascript");
			editor.setShowPrintMargin(false);
			editor.setOption("highlightActiveLine", false)
			editor.$blockScrolling = Infinity;
			editor.commands.addCommand({
				name: 'myCommand',
				bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
				exec: function(editor) {

					editorDiv.style.transition = "all 0.05s ease-in";
					editorDiv.style.backgroundColor = "#2E6DA4";

					if (orcDiv === true) {

						csound.evaluateCode(editor.getValue());
					}
					else {

						csound.readScore(editor.getValue());
					}
					setTimeout(function() {

						editorDiv.style.transition = "all .75s ease-in";
						editorDiv.style.backgroundColor = "";

					}, 50);
				},
				readOnly: true // false if this command should not apply in readOnly mode
			});
			return editor;
		};

		this.orcEditor = createEditor(this.orcEditorDiv, true);
		this.scoEditor = createEditor(this.scoEditorDiv, false);
		this.orcScoContainer.appendChild(this.orcEditorDiv);
		this.orcScoContainer.appendChild(this.orcBackDiv);
		this.orcScoContainer.appendChild(this.scoEditorDiv);
		this.orcScoContainer.appendChild(this.scoBackDiv);
		this.replaceParentDiv = function () {
			editorParentDiv.innerHTML = "";
			editorParentDiv.appendChild(that.orcScoContainer);
		};

	};

	return ORCSCOEditor;

});

