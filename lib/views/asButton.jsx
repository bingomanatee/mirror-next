import { PureComponent } from "react";
import {Text, Box} from 'grommet';
export default function asButton(name, Base, Over, Down) {

  const C = class extends PureComponent {
    state = {over: false, down: false}

    onMouseUp(e) {
      this.setState({down: false})
      if (this.props.onMouseUp) {
        this.props.onMouseUp(e);
      }
    }

    onMouseDown(e) {
      this.setState({down: true})
      if (this.props.onMouseDown) {
        this.props.onMouseDown(e);
      }
    }

    onMouseEnter(e) {
      this.setState({over: true})
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(e);
      }
    }

    onMouseLeave(e) {
      this.setState({over: false})
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(e);
      }
    }

    get hooks() {
      if (!this._hooks) {
        this._hooks = {
          onMouseDown: this.onMouseDown.bind(this),
          onMouseUp: this.onMouseUp.bind(this),
          onMouseEnter: this.onMouseEnter.bind(this),
          onMouseLeave: this.onMouseLeave.bind(this)
        }
      }

      return this._hooks
    }

    render() {
      const props = this.props;
      const {children, isActive} = props;
      const {over, down} = this.state;

      if (down || isActive) {
        return <Down {...props} {...this.hooks}>{children}</Down>
      } else if (over) {
        return <Over {...props} {...this.hooks}>{children}</Over>
      }
      return <Base {...props} {...this.hooks}>{children}</Base>
    }
  }

  return function(props) {

    if (props.children) {
      return <Box fill={false} alignSelf="center" as="button" className="plain-button" onClick={props.onClick}>
        <C {...props} />
        <Text alignSelf="center" margin="small" size="small">{props.children}</Text>
      </Box>
    }
    return <C {...props} />
  }

  Object.defineProperty(CText, 'name', {value: name});

  return CText;
}
