define('EditorPanel', ["ORCSCOEditor", "CSDEditor"], function(ORCSCOEditor, CSDEditor) {

	function EditorPanel(csound, fileManager) {

		var editorParentDiv = document.getElementById("EditorSection");

		var orcScoEditor = new ORCSCOEditor(editorParentDiv, csound, fileManager);
		this.orcEditorDiv = orcScoEditor.orcEditorDiv;
		this.scoEditorDiv = orcScoEditor.scoEditorDiv;
		var csdEditor = new CSDEditor(editorParentDiv);
		csdEditor.replaceParentDiv();
		var csdEditorButton = document.getElementById("CSDEditorButton");
		var orcScoEditorButton = document.getElementById("ORCSCOEditorButton");


		csdEditorButton.onclick = function() {

			csdEditorButton.className = "btn btn-primary btn-sm active"
			orcScoEditorButton.className = "btn btn-primary btn-sm"
			csdEditor.replaceParentDiv();
		};

		orcScoEditorButton.onclick = function() {

			csdEditorButton.className = "btn btn-primary btn-sm"
			orcScoEditorButton.className = "btn btn-primary btn-sm active"
			orcScoEditor.replaceParentDiv();
		};

		var compileButton = document.getElementById("CompileButton");
		compileButton.onclick = function() {

			var editorContents = csdEditor.editor.getValue();
			fileManager.writeStringToFile(csdEditor.currentFilePath, editorContents);
			csound.compileCSD(csdEditor.currentFilePath);
		};

		var renderButton = document.getElementById("RenderButton");
		renderButton.onclick = function() {

			csound.render(csdEditor.currentFilePath);
		};

		var performButton = document.getElementById("PerformButton");
		performButton.onclick = function() {

			csound.start();
		};

		var resetButton = document.getElementById("ResetButton");
		resetButton.onclick = function() {

			csound.reset();
		};


		this.onClickFunction = function(listItem) {

			var fileAsString = fileManager.readFileAsString(listItem.fileName);

			if (listItem.fileExtension === "csd") {

				csdEditorButton.onclick();
				csdEditor.replaceParentDiv();
				csdEditor.currentFilePath = listItem.fileName;
				csdEditor.editor.setValue(fileAsString, -1);
			}
			else if (listItem.fileExtension === "orc") {


				orcScoEditorButton.onclick();
				orcScoEditor.replaceParentDiv();
				orcScoEditor.currentFilePath = listItem.fileName;
				orcScoEditor.orcEditor.setValue(fileAsString, -1);
			}
			else if (listItem.fileExtension === "sco") {

				orcScoEditorButton.onclick();
				orcScoEditor.replaceParentDiv();
				orcScoEditor.currentFilePath = listItem.fileName;
				orcScoEditor.scoEditor.setValue(fileAsString, -1);

			}
		};

	};

	return EditorPanel;
});
