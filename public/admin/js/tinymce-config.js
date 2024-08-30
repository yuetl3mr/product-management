tinymce.init({
  selector: "textarea.textarea-mce",
  //   plugins: "lists link image table code help wordcount",
  setup: function (editor) {
    editor.on("change", function (e) {
      editor.save();
    });
  },
});
