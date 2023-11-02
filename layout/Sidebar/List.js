import { memo, useEffect, useState } from "react";

import Anchor from "./Anchor";
import AnimateHeight from "react-animate-height";
import { recursiveCheckId } from "./helpers";

const List = memo(
  ({ node, level, selectedNode, selectedItem, sidebarColor }) => {
    const [nodeChildren, setNodeChildren] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [firstInitializer, setFirstInitializer] = useState(false);

    const setSelectedClass = (isFound) => {
      if (isFound) {
        if (!firstInitializer) {
          setExpanded(true);
        }
        setIsSelected(selectedNode.children === undefined ? true : false);
      } else {
        setIsSelected(false);
        setExpanded(false);
      }
    };
    const hasItems = () => {
      return nodeChildren.length > 0 ? true : false;
    };
    const expand = (node) => {
      setFirstInitializer(true);
      setExpanded(!expanded);

      if (node.children === undefined) {
        selectedListItem(node);
      }
      selectedListItem(node);
    };

    const selectedListItem = (node) => {
      selectedItem(node);
    };

    useEffect(() => {
      setNodeChildren(node && node.children ? node.children : []);

      if (selectedNode !== undefined && selectedNode !== null) {
        setSelectedClass(recursiveCheckId(node, selectedNode.id));
      }
    }, [selectedNode]);

    const showChildren = hasItems() && expanded;

    return (
      <li
        className={`relative rounded-lg transition duration-500 ease-in-out ${
          (isSelected && level < 2) || (expanded && level < 2)
            ? `bg-${sidebarColor}-700 bg-opacity-60`
            : ``
        } ${level < 2 ? "mx-3" : "ltr:pl-5 rtl:pr-5 -ml-px"}`}
      >
        <Anchor
          icon={Object.keys(node).includes("icon") ? node.icon : ""}
          name={node.name}
          path={Object.keys(node).includes("path") ? node.path : ""}
          badge={node.badge}
          hasItems={hasItems()}
          isSelected={isSelected}
          expanded={expanded}
          expand={() => expand(node)}
          divider={Object.keys(node).includes("divider") ? node.divider : false}
          level={level}
        />

        {showChildren && <AnimateHeight duration={150} height={showChildren ? "auto" : 0}>
          <ul className={`overflow-hidden`}>
            {nodeChildren.map((singleNode, index) => {
              return (
                <List
                  key={index}
                  node={singleNode}
                  level={level + 1}
                  selectedNode={selectedNode}
                  sidebarColor={sidebarColor}
                  selectedItem={(e) => selectedListItem(e)}
                />
              );
            })}
          </ul>
        </AnimateHeight>}
      </li>
    );
  }
);

export default List;
