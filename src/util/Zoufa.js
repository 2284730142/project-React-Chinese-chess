export default class Zoufa {
    // 应该还要把qi的数组传进来，因为炮需要架一个东西才能打，需要判断路径上是否有东西
    static methodRun(selectedItem, nowItem) {
        switch (selectedItem[1].type) {
            case 1:// 黑色卒子，只能往上走 即top-1，left不动
                if (nowItem.position.top + 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                    return 1;
                } else {
                    return 0;
                }
            case 2:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 3:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 4:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 5:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 6:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 7:
                if (1) {
                    return 1;
                } else {
                    return 0;
                }
            case 8:
                if (nowItem.position.top - 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                    return 1;
                } else {
                    return 0;
                }
            default:
                return 0;
        }
    }

    static methodChi(item) {

    }
}

