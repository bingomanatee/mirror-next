import { PureComponent } from "react";
import { Text, Box } from 'grommet';
import { MirrorCollection } from '@wonderlandlabs/mirror';
import withStore from "./withStore";

export default function asButton(name, Base, Over, Down) {
  function ButtonComponent({store, over, out, down, hooks, active, disabled, children, click, ...props}) {
    /**
     * a component that displays one or more sub-elements depending on the
     */
    let Button = Base;
    if (down) {
      Button = Down;
    } else if (over) {
      Button = Over;
    }


    return <Box  {...hooks} fill={false} alignSelf="center" as="button" className="plain-button">
      <Button {...props} onClick={click}/>
      {(children) ?
        <Text alignSelf="center" margin="small" size="small" onClick={click}>{children}</Text>
        : ''}
    </Box>
  }

  /**
   * note - all event hooks are initialized and frozen
   * AT TIME OF INITIALIZATION.
   * doesn't listen for change of hooks.
   */
  return withStore(ButtonComponent, (props) => {
    return new MirrorCollection({
      clickTimeout: false,
      clicked: false,
      clickTime: 'clickTime' in props ? props.clickTime : 4000,
      // how long the button remains un-clickable. If negative can only be clicked once.
      // if zero, no click-locking take3s place.
      over: false,
      down: false
    }, {
      actions: {
        click(store, e) {
          if (store.$my.clicked) {
            return;
          }
          if (props.onClick) {
            props.onClick(e);
          }
          const t = store.$trans();
          if (store.$my.clickTimeout) {
            clearTimeout(store.$my.clickTimeout);
          }
          if (store.$my.clickTime !== 0) {
            store.do.setClicked(true);
            if (store.$my.clickTime > 0) {
              store.do.setClickTimeout(setTimeout(store.$do.unfreezeClicked, store.$my.clickTime));
            }
          }

          t.complete();
        },
        unfreezeClicked(store) {
          if (store.isComplete) {
            return;
          }
          const t2 = store.$trans();
          store.$do.setClicked(false);
          store.do.setClickTimeout(null);
          t2.complete();
        },
        hooks(store) {
          return {
            onMouseOver(e) {
              store.$do.setOver(true);
              if (props.onMouseOver) {
                props.onMouseOver(e);
              }
            },
            onMouseDown(e) {
              store.$do.setDown(true);
              if (props.onMouseDown) {
                props.onMouseDown(e);
              }
            },
            onMouseUp(e) {
              store.$do.setDown(false);
              if (props.onMouseUp) {
                props.onMouseUp(e);
              }
              store.$do.click();
            },
            onMouseLeave(e) {
              const t = store.$trans();
              store.$do.setOver(false);
              store.$do.setDown(false);
              t.complete();
              if (props.onMouseLeave) {
                props.onMouseLeave(e);
              }
            }
          }
        }
      }
    })
  }, (value, store, props) => {
    return {...value, click: store.$do.click, hooks: store.$do.hooks()};
  })
}
