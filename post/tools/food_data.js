// 這是一個獨立的資料檔案
// 將資料獨立出來，可以讓主程式更乾淨，也方便管理大量數據
const foodDatabase = {
    // === 原型食物類 ===
    'avocado': {
        name: '酪梨',
        engName: 'Avocado',
        icon: '🥑',
        category: '油脂與堅果種子類',
        portionName: '1 顆 (去籽約 150g)',
        portionWeight: 150,
        base: { calories: 160, protein: 2.0, fat: 14.7, carbs: 8.5, fiber: 6.7, potassium: 485 },
        summary: '優質油脂來源！雖然熱量稍高，但富含膳食纖維與鉀。適合生酮飲食或增肌減脂族群，建議取代沙拉醬食用。',
        color: 'bg-green-100'
    },
    'chicken': {
        name: '雞胸肉',
        engName: 'Chicken Breast',
        icon: '🍗',
        category: '豆魚蛋肉類',
        portionName: '1 片 (約 180g)',
        portionWeight: 180,
        base: { calories: 165, protein: 31.0, fat: 3.6, carbs: 0.0, fiber: 0.0, potassium: 256 },
        summary: '健身族群的聖品。極高蛋白質、低脂肪。因無碳水，建議搭配地瓜或五穀米食用，以維持代謝平衡。',
        color: 'bg-orange-100'
    },
    'salmon': {
        name: '鮭魚',
        engName: 'Salmon',
        icon: '🐟',
        category: '豆魚蛋肉類',
        portionName: '1 片 (約 200g)',
        portionWeight: 200,
        base: { calories: 208, protein: 20.4, fat: 13.4, carbs: 0.0, fiber: 0.0, potassium: 363 },
        summary: '豐富的 Omega-3 脂肪酸，護腦護心首選。雖然油脂較多，但屬於抗發炎的好油，適合每週食用 2-3 次。',
        color: 'bg-blue-100'
    },
    'sweet_potato': {
        name: '地瓜',
        engName: 'Sweet Potato',
        icon: '🍠',
        category: '全傑雜糧類',
        portionName: '1 條 (中型約 165g)',
        portionWeight: 165,
        base: { calories: 130, protein: 1.9, fat: 0.2, carbs: 29.5, fiber: 2.4, potassium: 280 },
        summary: '低 GI 優質澱粉。富含膳食纖維與維生素 A，能穩定血糖並幫助排便。比白飯更適合作為減脂期的主食。',
        color: 'bg-yellow-100'
    },
    'egg': {
        name: '雞蛋',
        engName: 'Egg',
        icon: '🥚',
        category: '豆魚蛋肉類',
        portionName: '1 顆 (約 55g)',
        portionWeight: 55,
        base: { calories: 139, protein: 12.7, fat: 8.9, carbs: 1.7, fiber: 0.0, potassium: 133 },
        summary: '最完美的蛋白質來源之一，吸收率極高。蛋黃含有珍貴的卵磷脂，建議整顆食用，不要只吃蛋白。',
        color: 'bg-yellow-50'
    },
    'broccoli': {
        name: '花椰菜',
        engName: 'Broccoli',
        icon: '🥦',
        category: '蔬菜類',
        portionName: '1 份 (約 100g)',
        portionWeight: 100,
        base: { calories: 33, protein: 3.7, fat: 0.1, carbs: 6.4, fiber: 3.1, potassium: 370 },
        summary: '蔬菜之王！極低熱量卻含有高蛋白質（以蔬菜而言）與高纖維。含有蘿蔔硫素，具有強大的抗氧化能力。',
        color: 'bg-green-50'
    },

    // === 國民小吃類 (Traffic Driver) ===
    'pearl_milk_tea': {
        name: '珍珠奶茶 (全糖)',
        engName: 'Bubble Milk Tea',
        icon: '🧋',
        category: '加工食品/含糖飲料',
        portionName: '1 杯 (大杯 700ml)',
        portionWeight: 700,
        base: { calories: 95, protein: 0.3, fat: 3.5, carbs: 15.0, fiber: 0.1, potassium: 20 }, 
        // 註：珍奶每100g看似還好，但因為一份是700g，總量驚人
        summary: '⚠️ 快樂的熱量炸彈。一杯大杯全糖珍奶熱量直逼 700 大卡（約等於一個便當）。主要來自精緻糖與奶精油脂，建議調整為無糖鮮奶茶。',
        color: 'bg-amber-100'
    },
    'chicken_cutlet': {
        name: '炸雞排',
        engName: 'Fried Chicken Cutlet',
        icon: '🔥',
        category: '加工食品/油炸類',
        portionName: '1 片 (約 300g)',
        portionWeight: 300,
        base: { calories: 280, protein: 16.0, fat: 18.0, carbs: 14.0, fiber: 0.5, potassium: 180 },
        summary: '⚠️ 國民宵夜首選，但油脂與鈉含量極高。外層的裹粉吸滿了油，一片熱量可能超過 800 大卡。建議去除外皮食用（雖然這樣就不好吃了）。',
        color: 'bg-red-100'
    },
    'braised_pork_rice': {
        name: '滷肉飯',
        engName: 'Braised Pork Rice',
        icon: '🍚',
        category: '複合料理',
        portionName: '1 碗 (約 250g)',
        portionWeight: 250,
        base: { calories: 200, protein: 7.0, fat: 10.0, carbs: 22.0, fiber: 0.5, potassium: 100 },
        summary: '台灣人的靈魂。滷汁通常含有大量油脂與糖，且鈉含量偏高。建議搭配燙青菜與滷蛋，增加纖維與蛋白質攝取以平衡血糖。',
        color: 'bg-orange-50'
    },
    'beef_noodle': {
        name: '紅燒牛肉麵',
        engName: 'Beef Noodle Soup',
        icon: '🍜',
        category: '複合料理',
        portionName: '1 碗 (約 700g)',
        portionWeight: 700,
        base: { calories: 110, protein: 6.5, fat: 5.0, carbs: 10.0, fiber: 1.0, potassium: 150 },
        summary: '湯頭濃郁但鈉含量驚人！紅燒湯底通常含有辣油與大量調味。建議只喝一半的湯，或選擇清燉口味，並多點一份豆干海帶。',
        color: 'bg-red-50'
    }
};