import React from 'react'
import {findDOMNode} from 'react-dom'

export default function testDecorator(labelsConstructor) {
  return Component => {
    const componentName = Component.displayName || Component.name

    if (!componentName) {
      throw new Error()
    }

    function markTestElement(name) {
      if (process.env.NODE_ENV === 'test') {
        return {
          'data-test-element': `${componentName}-${name}`
        }
      }

      return {}
    }

    return class TestComponent {
      static displayName = `TestComponent(${componentName})`

      componentDidMount() {
        this.refreshLabels()
      }

      componentDidUpdate() {
        this.refreshLabels()
      }

      refreshLabels() {
        if (process.env.NODE_ENV === 'test') {
          const labels = labelsConstructor
            ? labelsConstructor(this.props)
            : {}

          const componentNode = findDOMNode(this)

          if (!componentNode) {
            return
          }

          Object.keys(labels)
            .map((key) => {
              const value = labels[key]
              const labelName = key[0].toUpperCase() + key.slice(1)

              return {
                key: `testLabel${labelName}`,
                value
              }
            })
            .concat([{
              key: 'testComponent',
              value: componentName
            }])
            .reduce((componentNode, {key, value}) => (
              componentNode.dataset[key] = value,
              componentNode
            ), componentNode)
        }
      }

      render() {
        return (
          <Component
            {...this.props}
            markTestElement={markTestElement}
          />
        )
      }
    }
  }
}