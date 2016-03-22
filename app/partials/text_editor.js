import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';

class StyleButton extends React.Component {
  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'button';
    if (this.props.active) {
      className += ' active';
    }

    return (
      <span className={className} onMouseDown={this.onToggle.bind(this)}>
        {this.props.label}
      </span>
    );
  }

}

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    const markdown = props.markdown || '';
    this.state = {
      editorState: EditorState.createWithContent(
        stateFromMarkdown(markdown)
      )
    };
  }

  onChange(editorState) {
    this.setState({
      editorState
    });
    this.props.onChange(stateToMarkdown(editorState.getCurrentContent()));
  }

  focus() {
    this.refs.editor.focus();
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.updateContent(newState);
      return true;
    }
    return false;
  }

  toggleInlineStyle(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  toggleBlockType(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  render() {
    const { editorState } = this.state;

    const BLOCK_TYPES = [
      { label: 'H2', style: 'header-two' },
      { label: 'H3', style: 'header-three' },
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' }
    ];

    const INLINE_STYLES = [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' }
    ];

    const InlineStyleControls = (props) => {
      const currentStyle = props.editorState.getCurrentInlineStyle();
      return (
        <div className="button-bar">
          {INLINE_STYLES.map(type =>
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    const BlockStyleControls = (props) => {
      const { editorState } = props;
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

      return (
        <div className="button-bar">
          {BLOCK_TYPES.map((type) =>
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    return (
      <div className="text-editor" >
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType.bind(this)}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle.bind(this)}
        />
        <div onClick={this.focus.bind(this)}>
          <Editor editorState={editorState}
            onChange={this.onChange.bind(this)}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
