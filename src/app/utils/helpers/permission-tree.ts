import { Permissions } from '../../entities/security/permissions'
import { SelectionModel } from '@angular/cdk/collections'

export class PermissionTree {

    static getChildren(perm: Permissions, data: Permissions[]): Permissions {

        let children = data.filter((e: any) => parseInt(e.parent) == (perm.id))

        let childdrenArray: any[] = []
        children.forEach(i => {
            let ch = PermissionTree.getChildren(i, data)
            childdrenArray.push(ch)
        })

        perm.children = childdrenArray;
        return perm

    }


    static getParent(parentId: any, data: Permissions[]): number[] {

        let parents: number[] = []
        let parentId_ = parseInt(parentId.parent);
        if (isNaN(parentId_)) {
            return []
        }

        let parent: any = data?.find((e) => {
            return e.id == parentId_
        })

        if (!parent)
            return []

        parents.push(parent.id)

        let $return = parents.concat(PermissionTree.getParent(parent, data))
        return $return

    }


    static toTree(data: Permissions[]): Permissions[] {

        let map: Permissions[] = []
        data?.forEach((item: any) => {
            try {
                let parentId = parseInt(item.parent);
                if (isNaN(parentId))
                    throw new Error()

            } catch (e) {
                // at the top... lets find his children
                item = PermissionTree.getChildren(item, data)
                map.push(item)
            }
        })

        return map;
    }


    static getSelected(selection: SelectionModel<number>, flatData: Permissions[]) {

        flatData = flatData ?? []

        let data = flatData.filter((p: any) => {
            return selection.isSelected(p.id)
        })

        let allData = data.map(p => p.id )
        
        //console.log(allData);
        

        data?.forEach(p => {
            allData = allData.concat(PermissionTree.getParent(p, flatData))
        })

        return allData.filter((e, i, self) => self.indexOf(e) === i)
        
        



    }


}
