// Niferex力蜚能的奖金计算策略
let niStrategies = {
    // 奖金基数
    bonusBase(sales,monNum){
        let avSales = Math.round(Number(sales)/Number(monNum)*100)/100 ; //平均每月销量
        let bBase = {                           //销量区间对应的奖金基数
            "12000":12500,
            "9000":11000,
            "7000":9000,
            "5500":7000,
            "4500":5500,
            "3500":4000,
            "0.01":2800,
        };
        let arr = [12000,9000,7000,5500,4500,3500,0.01];
        for(let i = 0 ; i < arr.length; i++){
            if(avSales >= arr[i]){
                return bBase[arr[i]];
            }
        }
    },
    // 达成率
    totalAchieveRate(sales, standard) {
        return Math.round(Number(sales)/Number(standard)*10000)/100;
    },
    // 达成系数
    totalAchieveIndex(rate,monthAvg) {
        let initRate = rate;
        if(initRate < 85){
            return 0
        }else if(initRate >= 85 && initRate < 90){
            return 0.7
        } else if(initRate >= 90 && initRate < 95){
            if(monthAvg < 3500){
                return 0.7
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 0.8
            } else if(monthAvg >= 5500){
                return 0.9
            }
        } else if(initRate >= 95 && initRate < 100){
            if(monthAvg < 3500){
                return 0.9
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1
            } else if(monthAvg >= 5500){
                return 1.1
            }
        } else if(initRate >= 100 && initRate < 101){
            if(monthAvg < 3500){
                return 1
            } else if(monthAvg >= 3500 && monthAvg < 7000){
                return 1.1
            } else if(monthAvg >= 7000){
                return 1.2
            }
        } else if (initRate >= 101 && initRate < 120){
            if(monthAvg < 3500){
                return 1.1
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1.2
            } else if(monthAvg >= 5500){
                return 1.3
            } 
        } else if(initRate >= 120){
            if(monthAvg < 3500){
                return 1.2
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1.3
            } else if(monthAvg >= 5500){
                return 1.5
            }
        }
    },
    // 增长率
    growthRate(sales,monNum,monthAvg){
        return Math.round((Number(sales)/Number(monNum)/Number(monthAvg) -1)*10000)/100;
    },
    growthRateIndex(initIndex,monthAvg){
        //initIndex 是由growthRate函数算出来的
        if(initIndex < 1){
            if(monthAvg < 4500){
                return 0.8
            } else if (monthAvg >= 4500){
                return 0.9
            }
        } else if( initIndex >=1 && initIndex < 20){
            if(monthAvg < 5500){
                return 1
            } else if (monthAvg >= 5500 && monthAvg < 9000){
                return 1.05
            } else if (monthAvg >= 9000){
                return 1.1
            }
        } else if(initIndex >= 20 && initIndex < 40){
            if(monthAvg < 4500){
                return 1.05
            } else if (monthAvg >= 4500 && monthAvg < 5500){
                return 1.1
            } else if (monthAvg >= 5500){
                return 1.2
            }
        } else if(initIndex >= 40 && initIndex < 60){
            if(monthAvg < 4500){
                return 1.2
            } else if (monthAvg >= 4500 && monthAvg < 5500){
                return 1.3
            } else if (monthAvg >= 5500){
                return 1.4
            }
        } else if(initIndex >= 60 && initIndex < 90){
            if(monthAvg < 4500){
                return 1.5
            } else if (monthAvg >= 4500 && monthAvg < 7000){
                return 1.6
            } else if (monthAvg >= 7000){
                return 1.8
            }
        } else if(initIndex >= 90 && initIndex < 150){
            if(monthAvg < 3500){
                return 1.8
            } else if (monthAvg >= 3500 && monthAvg < 7000){
                return 2
            } else if(monthAvg >= 7000){
                return 2.5
            }
        } else if(initIndex >= 150){
            if(monthAvg < 3500){
                return 2
            } else if (monthAvg >= 3500 && monthAvg < 5500){
                return 2.5
            } else if(monthAvg >= 5500){
                return 3
            }
        }
    },
    // 历史奖金基数
    hisBonusBase(lastMonSales,month){
        let avgSales = Number(lastMonSales)/(Number(month) -1);
        let hBonusBase = {                           
            "12000":12500,
            "9000":11000,
            "7000":9000,
            "5500":7000,
            "4500":5500,
            "3500":4000,
            "0.01":2800,
        };
        let arr = [12000,9000,7000,5500,4500,3500,0.01];
        for(let i = 0 ; i < arr.length; i++){
            if(avgSales >= arr[i]){
                return hBonusBase[arr[i]];
            }
        }
    },
    // 历史达成率
    hisAchRate(lastSales,lastStandard){
        return Math.round(Number(lastSales)/Number(lastStandard)*10000)/100;
    },
    // 历史增长率
    hisAddRate(sales,monNum,monthAvg){
        return Math.round((Number(sales)/(Number(monNum) - 1)/Number(monthAvg) -1)*10000)/100
    }
};
// 策略医院增长奖金
let strategyHosAddBonus = {
    // YTD月均增量
    ytdMonAdd(sales,month,monthAvg){
        return Math.round((Number(sales)/Number(month) - Number(monthAvg))*100)/100; 
    },
    // 单盒奖金数
    singleBonus(monthAdd){
        if(monthAdd < 100){
            return 0;
        } else if(monthAdd >= 100 && monthAdd < 500){
            return 1
        } else if(monthAdd >= 500 && monthAdd < 1000){
            return 2
        } else if(monthAdd >= 1000){
            return 3
        }
    },
    // YTD应发奖金
    ytdBonus(monthAdd,singleBonus,month){
        return Math.round(Number(monthAdd)*Number(singleBonus)*Number(month)*100)/100; 
    },
    // 历史月均增量
    hisYtdMonAdd(lastMonthSale,month,monthAvg){
        return Math.round((Number(lastMonthSale)/(Number(month) - 1) - Number(monthAvg))*100)/100 ;
    },
    // 岗位达成率
    posAchRate(totalSales,totalStandard){
        return Math.round(Number(totalSales)/Number(totalStandard)*10000)/100; 
    },
    // 耽搁医院达成率
    singleHosAchRate(hosSales,hosStandard){
        return Math.round(Number(hosSales)/Number(hosStandard)*10000)/100; 
    },
    // 医院月增长量
    hosMonthAdd(hosSales,month,monthAvg){
        return Math.round((Number(hosSales)/Number(month) - Number(monthAvg))*100)/100;
    },
};
export {
    niStrategies,
    strategyHosAddBonus
}