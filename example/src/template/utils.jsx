
export function getMenuItems (moduleData, categoryOrder, typeOrder) {
  const menuMeta = moduleData.map((item) => item.meta).filter((meta) => !meta.skip)

  const menuItems = []
  const sortFn = (a, b) => (a.order || 0) - (b.order || 0)
  menuMeta.sort(sortFn).forEach((meta) => {
    if (!meta.category) {
      menuItems.push(meta)
      return
    }

    // Component
    if (meta.category === 'Components' && meta.type) {
      let type = menuItems.find((i) => i.title === meta.type)
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type]
        }
        menuItems.push(type)
      }
      type.children = type.children || []
      type.children.push(meta)
      return
    }

    let group = menuItems.find((i) => i.title === meta.category)

    if (!group) {
      group = {
        type: 'category',
        title: meta.category,
        children: [],
        order: categoryOrder[meta.category]
      }
      menuItems.push(group)
    }

    group.children = group.children || []

    if (meta.type) {
      let type = group.children.filter((i) => i.title === meta.type)[0]
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type]
        }
        group.children.push(type)
      }
      type.children = type.children || []
      type.children.push(meta)
    } else {
      group.children.push(meta)
    }
  })
  function nestSort (list) {
    return list.sort(sortFn).map((item) => {
      if (item.children) {
        return {
          ...item,
          children: nestSort(item.children)
        }
      }

      return item
    })
  }

  return nestSort(menuItems)
}
