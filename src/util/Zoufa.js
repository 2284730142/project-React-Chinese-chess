export default class Zoufa {
    // 应该还要把qi的数组传进来，因为炮需要架一个东西才能打，需要判断路径上是否有东西
    static methodTaolu(selectedItem, nowItem, qi, what) {

        switch (selectedItem[1].type) {
            case 1:// 黑色卒子，在下半边，只能往上走 即top-1，left不动,上半边只能往上或左右，不可以往后
                if (selectedItem[1].position.top > 4) {
                    if (nowItem.position.top + 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    if (nowItem.position.top + 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                        return 1;
                    } else if ((nowItem.position.left === selectedItem[1].position.left + 1 && nowItem.position.top === selectedItem[1].position.top) || (nowItem.position.left === selectedItem[1].position.left - 1 && nowItem.position.top === selectedItem[1].position.top)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            case 2:// 炮
                if (what === 0) { // 走位
                    return paoModZou();
                } else { // 吃
                    return paoModChi();
                }
            case 3:// 車
                return cheMod();
            case 4:// 马，斜着走，横跨“日”位子，中间路障判断
                const hDisplacementM = Math.abs(selectedItem[1].position.left - nowItem.position.left);
                const vDisplacementM = Math.abs(selectedItem[1].position.top - nowItem.position.top);
                if ((Math.abs(hDisplacementM - vDisplacementM) - 1) === 0 && hDisplacementM > 0 && vDisplacementM > 0) {
                    return maMod(hDisplacementM, vDisplacementM);
                } else {
                    return 0;
                }
            case 5:// 象，斜着走，横跨“田”位子，越界判断，中间路障判断,
                const hDisplacementX = Math.abs(selectedItem[1].position.left - nowItem.position.left);
                const vDisplacementX = Math.abs(selectedItem[1].position.top - nowItem.position.top);
                if ((hDisplacementX - vDisplacementX) === 0) {
                    if (hDisplacementX === 2 && vDisplacementX === 2) {
                        if (0 <= selectedItem[1].position.top && selectedItem[1].position.top <= 4) {
                            if (0 <= nowItem.position.top && nowItem.position.top <= 4) {
                                return xiangMod();
                            } else {
                                return 0;
                            }
                        } else if (5 <= selectedItem[1].position.top && selectedItem[1].position.top <= 9) {
                            if (5 <= nowItem.position.top && nowItem.position.top <= 9) {
                                return xiangMod();
                            } else {
                                return 0;
                            }
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            case 6:// 仕，只能斜着走，只能走一格
                const hDisplacementSh = Math.abs(selectedItem[1].position.left - nowItem.position.left);
                const vDisplacementSh = Math.abs(selectedItem[1].position.top - nowItem.position.top);
                if ((hDisplacementSh - vDisplacementSh) === 0) {
                    if (hDisplacementSh === 1 && vDisplacementSh === 1) {
                        if (0 <= selectedItem[1].position.top && selectedItem[1].position.top <= 2) {
                            if (nowItem.position.left >= 3 && nowItem.position.left <= 5 && nowItem.position.top <= 3 && nowItem.position.top >= 0) {
                                return 1;
                            } else {
                                return 0;
                            }
                        } else if (7 <= selectedItem[1].position.top && selectedItem[1].position.top <= 9) {
                            if (nowItem.position.left >= 3 && nowItem.position.left <= 5 && nowItem.position.top <= 9 && nowItem.position.top >= 7) {
                                return 1;
                            } else {
                                return 0;
                            }
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            case 7:// 将，不能斜着走,只能走一格，固定范围，
                const hDisplacementJ = Math.abs(selectedItem[1].position.left - nowItem.position.left);
                const vDisplacementJ = Math.abs(selectedItem[1].position.top - nowItem.position.top);
                if ((hDisplacementJ === 0 && vDisplacementJ !== 0) || (hDisplacementJ !== 0 && vDisplacementJ === 0)) {
                    if (hDisplacementJ === 1 || vDisplacementJ === 1) {
                        if (nowItem.position.left >= 3 && nowItem.position.left <= 5 && nowItem.position.top <= 9 && nowItem.position.top >= 7) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            case 8: // 兵，相当于下半边的卒
                if (selectedItem[1].position.top < 5) {
                    if (nowItem.position.top - 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    if (nowItem.position.top - 1 === selectedItem[1].position.top && nowItem.position.left === selectedItem[1].position.left) {
                        return 1;
                    } else if ((nowItem.position.left === selectedItem[1].position.left + 1 && nowItem.position.top === selectedItem[1].position.top) || (nowItem.position.left === selectedItem[1].position.left - 1 && nowItem.position.top === selectedItem[1].position.top)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            case 9:// 帅不能斜着走,只能走一格，固定范围，
                const hDisplacementS = Math.abs(selectedItem[1].position.left - nowItem.position.left);
                const vDisplacementS = Math.abs(selectedItem[1].position.top - nowItem.position.top);
                if ((hDisplacementS === 0 && vDisplacementS !== 0) || (hDisplacementS !== 0 && vDisplacementS === 0)) {
                    if (hDisplacementS === 1 || vDisplacementS === 1) {
                        if (nowItem.position.left >= 3 && nowItem.position.left <= 5 && nowItem.position.top <= 3 && nowItem.position.top >= 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            default:
                return 0;
        }

        function paoModZou() {
            // 判断是否是水平或者垂直的位移,有且至少有一个是0,再判断中间是否有障碍物
            const hDisplacement = Math.abs(selectedItem[1].position.left - nowItem.position.left);
            const vDisplacement = Math.abs(selectedItem[1].position.top - nowItem.position.top);
            console.log(hDisplacement, vDisplacement);
            if ((hDisplacement === 0 && vDisplacement !== 0) || (hDisplacement !== 0 && vDisplacement === 0)) {
                let flag = 0;
                if (vDisplacement !== 0) {// 垂直情况,路障水平（left）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.left === nowItem.position.left) {
                                if ((qi[i].position.top > nowItem.position.top && qi[i].position.top < selectedItem[1].position.top) || (qi[i].position.top < nowItem.position.top && qi[i].position.top > selectedItem[1].position.top)) {
                                    flag++;
                                }
                            }
                        }
                    }
                } else if (hDisplacement !== 0) {// 水平情况,路障垂直（top）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.top === nowItem.position.top) {
                                if ((qi[i].position.left > nowItem.position.left && qi[i].position.left < selectedItem[1].position.left) || (qi[i].position.left < nowItem.position.left && qi[i].position.left > selectedItem[1].position.left)) {
                                    flag++;
                                }
                            }
                        }
                    }
                }
                if (flag === 0) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }

        function paoModChi() {
            // 判断是否是水平或者垂直的位移,有且至少有一个是0,再判断中间是否有障碍物
            const hDisplacement = Math.abs(selectedItem[1].position.left - nowItem.position.left);
            const vDisplacement = Math.abs(selectedItem[1].position.top - nowItem.position.top);
            console.log(hDisplacement, vDisplacement);
            if ((hDisplacement === 0 && vDisplacement !== 0) || (hDisplacement !== 0 && vDisplacement === 0)) {
                let flag = 0;
                if (vDisplacement !== 0) {// 垂直情况,路障水平（left）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.left === nowItem.position.left) {
                                if ((qi[i].position.top > nowItem.position.top && qi[i].position.top < selectedItem[1].position.top) || (qi[i].position.top < nowItem.position.top && qi[i].position.top > selectedItem[1].position.top)) {
                                    flag++;
                                }
                            }
                        }
                    }
                } else if (hDisplacement !== 0) {// 水平情况,路障垂直（top）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.top === nowItem.position.top) {
                                if ((qi[i].position.left > nowItem.position.left && qi[i].position.left < selectedItem[1].position.left) || (qi[i].position.left < nowItem.position.left && qi[i].position.left > selectedItem[1].position.left)) {
                                    flag++;
                                }
                            }
                        }
                    }
                }
                if (flag === 1) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }

        function cheMod() {
            // 判断是否是水平或者垂直的位移,有且至少有一个是0,再判断中间是否有障碍物
            const hDisplacement = Math.abs(selectedItem[1].position.left - nowItem.position.left);
            const vDisplacement = Math.abs(selectedItem[1].position.top - nowItem.position.top);
            console.log(hDisplacement, vDisplacement);
            if ((hDisplacement === 0 && vDisplacement !== 0) || (hDisplacement !== 0 && vDisplacement === 0)) {
                let flag = 0;
                if (vDisplacement !== 0) {// 垂直情况,路障水平（left）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.left === nowItem.position.left) {
                                if ((qi[i].position.top > nowItem.position.top && qi[i].position.top < selectedItem[1].position.top) || (qi[i].position.top < nowItem.position.top && qi[i].position.top > selectedItem[1].position.top)) {
                                    flag++;
                                }
                            }
                        }
                    }
                } else if (hDisplacement !== 0) {// 水平情况,路障垂直（top）相同
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (qi[i].position.top === nowItem.position.top) {
                                if ((qi[i].position.left > nowItem.position.left && qi[i].position.left < selectedItem[1].position.left) || (qi[i].position.left < nowItem.position.left && qi[i].position.left > selectedItem[1].position.left)) {
                                    flag++;
                                }
                            }
                        }
                    }
                }
                if (flag === 0) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        }

        function xiangMod() {
            let flag = 0;
            if (nowItem.position.top > selectedItem[1].position.top && nowItem.position.left > selectedItem[1].position.left) {
                for (let i in qi) {
                    if (qi[i].power !== 2) {
                        if (selectedItem[1].position.top + 1 === qi[i].position.top && selectedItem[1].position.left + 1 === qi[i].position.left) {
                            flag++;
                        }
                    }
                }
            } else if (nowItem.position.top > selectedItem[1].position.top && nowItem.position.left < selectedItem[1].position.left) {
                for (let i in qi) {
                    if (qi[i].power !== 2) {
                        if (selectedItem[1].position.top + 1 === qi[i].position.top && selectedItem[1].position.left - 1 === qi[i].position.left) {
                            flag++;
                        }
                    }
                }
            } else if (nowItem.position.top < selectedItem[1].position.top && nowItem.position.left > selectedItem[1].position.left) {
                for (let i in qi) {
                    if (qi[i].power !== 2) {
                        if (selectedItem[1].position.top - 1 === qi[i].position.top && selectedItem[1].position.left + 1 === qi[i].position.left) {
                            flag++;
                        }
                    }
                }
            } else if (nowItem.position.top < selectedItem[1].position.top && nowItem.position.left < selectedItem[1].position.left) {
                for (let i in qi) {
                    if (qi[i].power !== 2) {
                        if (selectedItem[1].position.top - 1 === qi[i].position.top && selectedItem[1].position.left - 1 === qi[i].position.left) {
                            flag++;
                        }
                    }
                }
            }

            if (flag === 0) {
                return 1;
            } else {
                return 0;
            }
        }

        function maMod(hDisplacementM, vDisplacementM) {
            console.log(hDisplacementM, vDisplacementM);
            let flag = 0;
            if (hDisplacementM === 2) {
                if (nowItem.position.left > selectedItem[1].position.left) {
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (selectedItem[1].position.left + 1 === qi[i].position.left && selectedItem[1].position.top === qi[i].position.top) {
                                flag++;
                            }
                        }
                    }
                } else if (nowItem.position.left < selectedItem[1].position.left) {
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (selectedItem[1].position.left - 1 === qi[i].position.left && selectedItem[1].position.top === qi[i].position.top) {
                                flag++;
                            }
                        }
                    }
                }
            } else if (vDisplacementM === 2) {
                if (nowItem.position.top > selectedItem[1].position.top) {
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (selectedItem[1].position.top + 1 === qi[i].position.top && selectedItem[1].position.left === qi[i].position.left) {
                                flag++;
                            }
                        }
                    }
                } else if (nowItem.position.top < selectedItem[1].position.top) {
                    for (let i in qi) {
                        if (qi[i].power !== 2) {
                            if (selectedItem[1].position.top - 1 === qi[i].position.top && selectedItem[1].position.left === qi[i].position.left) {
                                flag++;
                            }
                        }
                    }
                }
            }

            if (flag === 0) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}

