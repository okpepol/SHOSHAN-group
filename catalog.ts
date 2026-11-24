export type CategoryGroup = 'all' | 'popular' | 'tech' | 'lifestyle';

export interface ShoppingCategory {
  id: string;
  name: string;
  englishLabel: string;
  description: string;
  searchQuery: string;
  amazonIndex?: string;
  group: Exclude<CategoryGroup, 'all'>[];
  iconName:
    | 'smartphone'
    | 'tv'
    | 'laptop'
    | 'home'
    | 'utensils'
    | 'shirt'
    | 'sparkles'
    | 'baby'
    | 'dumbbell'
    | 'watch';
  quickSearches: Array<{ label: string; query: string }>;
}

export interface ShoppingGuide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  items: Array<{
    title: string;
    subtitle: string;
    query: string;
  }>;
}

export const SEARCH_SCOPE_OPTIONS = [
  { value: 'aps', label: 'كل الأقسام' },
  { value: 'electronics', label: 'الإلكترونيات والهواتف' },
  { value: 'computers', label: 'الكمبيوتر واللابتوب' },
  { value: 'kitchen', label: 'المنزل والمطبخ' },
  { value: 'fashion', label: 'الأزياء والموضة' },
  { value: 'beauty', label: 'الجمال والعناية' },
  { value: 'baby', label: 'مستلزمات الأطفال' },
  { value: 'sporting', label: 'الرياضة واللياقة' },
];

export const FEATURED_SEARCH_SUGGESTIONS: Array<{ label: string; query: string }> = [
  { label: 'سماعات بلوتوث عازلة للضوضاء', query: 'سماعات بلوتوث عازلة للضوضاء' },
  { label: 'قلاية هوائية بدون زيت', query: 'قلاية هوائية' },
  { label: 'هواتف ذكية 5G', query: 'هاتف ذكي 5G' },
  { label: 'ماكينة قهوة إسبريسو', query: 'ماكينة قهوة اسبريسو' },
  { label: 'باور بانك شحن سريع 20000', query: 'باور بانك 20000 شحن سريع' },
  { label: 'لابتوب للعمل والدراسة', query: 'لابتوب للعمل والدراسة' },
  { label: 'شاشة كمبيوتر IPS', query: 'شاشة كمبيوتر IPS' },
  { label: 'ساعة ذكية رياضية', query: 'ساعة ذكية رياضية' },
];

export const PRODUCT_CATEGORIES: ShoppingCategory[] = [
  {
    id: 'smartphones',
    name: 'الهواتف الذكية',
    englishLabel: 'Smartphones',
    description: 'أحدث الموبايلات بمختلف الفئات السعرية من سامسونج وأبل وشاومي وأوبو وغيرها.',
    searchQuery: 'هواتف ذكية موبايل',
    amazonIndex: 'electronics',
    group: ['popular', 'tech'],
    iconName: 'smartphone',
    quickSearches: [
      { label: 'موبايلات الفئة المتوسطة', query: 'هاتف ذكي فئة متوسطة' },
      { label: 'هواتف 5G', query: 'موبايل 5G' },
      { label: 'هواتف ببطارية كبيرة', query: 'موبايل بطارية 5000' },
    ],
  },
  {
    id: 'electronics',
    name: 'الإلكترونيات',
    englishLabel: 'Electronics',
    description: 'الشاشات الذكية، السماعات اللاسلكية، الكاميرات، وأجهزة الصوت المنزلية.',
    searchQuery: 'إلكترونيات شاشات وسماعات',
    amazonIndex: 'electronics',
    group: ['popular', 'tech'],
    iconName: 'tv',
    quickSearches: [
      { label: 'تلفزيونات ذكية 4K', query: 'تلفزيون ذكي 4K' },
      { label: 'سماعات أذن لاسلكية', query: 'سماعات اذن لاسلكية' },
      { label: 'راوتر واي فاي منزلي', query: 'راوتر واي فاي' },
    ],
  },
  {
    id: 'computers',
    name: 'الكمبيوتر واللابتوب',
    englishLabel: 'Computers & Laptops',
    description: 'أجهزة اللابتوب للأعمال والألعاب، الشاشات، ووحدات التخزين السريعة.',
    searchQuery: 'لابتوب وكمبيوتر',
    amazonIndex: 'computers',
    group: ['popular', 'tech'],
    iconName: 'laptop',
    quickSearches: [
      { label: 'لابتوب للبرمجة والعمل', query: 'لابتوب Core i5 SSD' },
      { label: 'هارد SSD خارجي', query: 'هارد SSD خارجي' },
      { label: 'شاشات كمبيوتر', query: 'شاشة كمبيوتر' },
    ],
  },
  {
    id: 'home-appliances',
    name: 'الأجهزة المنزلية',
    englishLabel: 'Home Appliances',
    description: 'المكانس الكهربائية، المكاوي البخارية، منقيات الهواء، والأجهزة اليومية للمنزل.',
    searchQuery: 'أجهزة منزلية كهربائية',
    amazonIndex: 'kitchen',
    group: ['popular', 'lifestyle'],
    iconName: 'home',
    quickSearches: [
      { label: 'مكانس كهربائية', query: 'مكنسة كهربائية' },
      { label: 'مكواة بخار عمودية', query: 'مكواة بخار' },
      { label: 'مراوح ومبردات هواء', query: 'مروحة عمودية' },
    ],
  },
  {
    id: 'kitchen',
    name: 'المطبخ وأدواته',
    englishLabel: 'Kitchen',
    description: 'أجهزة الطهي الحديثة، ماكينات القهوة، القلايات الهوائية، وأواني التحضير.',
    searchQuery: 'أدوات مطبخ وأجهزة تحضير الطعام',
    amazonIndex: 'kitchen',
    group: ['popular', 'lifestyle'],
    iconName: 'utensils',
    quickSearches: [
      { label: 'قلايات هوائية', query: 'قلاية هوائية' },
      { label: 'ماكينات قهوة', query: 'ماكينة قهوة' },
      { label: 'أطقم حلل جرانيت', query: 'طقم حلل جرانيت' },
    ],
  },
  {
    id: 'fashion',
    name: 'الأزياء والموضة',
    englishLabel: 'Fashion',
    description: 'ملابس كاجوال ورسمية للرجال والنساء، أحذية مريحة، وحقائب يومية.',
    searchQuery: 'أزياء وملابس رجالي وحريمي',
    amazonIndex: 'fashion',
    group: ['lifestyle'],
    iconName: 'shirt',
    quickSearches: [
      { label: 'أحذية رياضية كاجوال', query: 'حذاء رياضي رجالي' },
      { label: 'تيشيرتات قطن', query: 'تيشيرت قطن' },
      { label: 'حقائب ظهر للعمل', query: 'شنطة ظهر لابتوب' },
    ],
  },
  {
    id: 'beauty',
    name: 'الجمال والعناية الشخصية',
    englishLabel: 'Beauty & Personal Care',
    description: 'منتجات العناية بالبشرة والشعر، العطور، وأجهزة العناية الشخصية.',
    searchQuery: 'العناية بالبشرة والشعر والعطور',
    amazonIndex: 'beauty',
    group: ['popular', 'lifestyle'],
    iconName: 'sparkles',
    quickSearches: [
      { label: 'غسول ومرطبات البشرة', query: 'غسول مرطب للبشرة' },
      { label: 'ماكينات حلاقة وتشذيب', query: 'ماكينة حلاقة رجالي' },
      { label: 'واقي شمس للبشرة', query: 'واقي شمس' },
    ],
  },
  {
    id: 'baby',
    name: 'مستلزمات الأطفال',
    englishLabel: 'Baby Products',
    description: 'عربات الأطفال، مستلزمات الرضاعة والعناية اليومية، والألعاب التعليمية.',
    searchQuery: 'مستلزمات الأطفال والرضع',
    amazonIndex: 'baby',
    group: ['lifestyle'],
    iconName: 'baby',
    quickSearches: [
      { label: 'عربات أطفال خفيفة', query: 'عربة أطفال' },
      { label: 'حفاضات وعناية بالطفل', query: 'حفاضات أطفال' },
      { label: 'ألعاب تعليمية للأطفال', query: 'ألعاب تعليمية للأطفال' },
    ],
  },
  {
    id: 'sports',
    name: 'الرياضة واللياقة',
    englishLabel: 'Sports & Fitness',
    description: 'معدات التمرين المنزلي، الدمبلز، سجادات اليوغا، والملابس الرياضية.',
    searchQuery: 'معدات رياضية ولياقة بدنية',
    amazonIndex: 'sporting',
    group: ['lifestyle'],
    iconName: 'dumbbell',
    quickSearches: [
      { label: 'أوزان ودمبلز منزلية', query: 'دمبلز تمارين منزلية' },
      { label: 'سجادة تمارين ويوغا', query: 'سجادة تمارين رياضية' },
      { label: 'زمزمية مياه رياضية', query: 'زجاجة مياه رياضية' },
    ],
  },
  {
    id: 'accessories',
    name: 'الإكسسوارات',
    englishLabel: 'Accessories',
    description: 'كابلات الشحن السريع، الباور بانك، حوامل السيارات، وساعات اليد والإكسسوارات.',
    searchQuery: 'إكسسوارات الهواتف والشواحن والساعات',
    amazonIndex: 'electronics',
    group: ['tech'],
    iconName: 'watch',
    quickSearches: [
      { label: 'شواحن سريعة وكابلات', query: 'شاحن سريع Type-C' },
      { label: 'حامل موبايل للسيارة', query: 'حامل موبايل للسيارة' },
      { label: 'ساعات يد كلاسيكية', query: 'ساعة يد رجالي' },
    ],
  },
];

export const SHOPPING_GUIDES: ShoppingGuide[] = [
  {
    id: 'phones-budgets',
    kicker: 'دليل الهواتف الذكية',
    title: 'أفضل الهواتف لمختلف الميزانيات',
    description: 'استكشف خيارات الهواتف على أمازون مصر مصنفة حسب احتياجك الفعلي من الاستخدام اليومي إلى الأداء الاحترافي.',
    image: '/src/assets/images/guide_smartphones_1795543533102.jpg',
    imageAlt: 'مجموعة هواتف ذكية حديثة على سطح حجري فاتح',
    items: [
      {
        title: 'هواتف الفئة الاقتصادية',
        subtitle: 'للاستخدام اليومي والتصفح ببطارية تدوم طويلاً',
        query: 'هاتف ذكي اقتصادي بطارية كبيرة',
      },
      {
        title: 'هواتف الفئة المتوسطة 5G',
        subtitle: 'توازن ممتاز بين الأداء والكاميرا والشاشة السلسة',
        query: 'هاتف ذكي فئة متوسطة 5G',
      },
      {
        title: 'الهواتف الرائدة (Flagship)',
        subtitle: 'أعلى أداء للتصوير الاحترافي والمعالجات القوية',
        query: 'هاتف ذكي رائد كاميرا احترافية',
      },
    ],
  },
  {
    id: 'home-essentials',
    kicker: 'دليل المنزل والمطبخ',
    title: 'أساسيات المنزل العصري والمطبخ',
    description: 'أدوات وأجهزة عملية تجعل الروتين اليومي في المنزل والمطبخ أسرع وأكثر راحة وجودة.',
    image: '/src/assets/images/guide_home_kitchen_1795543532889.jpg',
    imageAlt: 'أجهزة مطبخ عصرية وماكينة قهوة وغلاية بيضاء على رخام نظيف',
    items: [
      {
        title: 'ركن القهوة المنزلي',
        subtitle: 'ماكينات إسبريسو وغلايات كهربائية بدرجة حرارة دقيقة',
        query: 'ماكينة قهوة اسبريسو وغلاية',
      },
      {
        title: 'الطهي الصحي والسريع',
        subtitle: 'قلايات هوائية وأجهزة تحضير الطعام اليومية',
        query: 'قلاية هوائية كبيرة',
      },
      {
        title: 'تنظيف وتنظيم المنزل',
        subtitle: 'مكانس لاسلكية ومنظمات تخزين ذكية',
        query: 'مكنسة كهربائية لاسلكية',
      },
    ],
  },
  {
    id: 'computer-accessories',
    kicker: 'دليل بيئة العمل',
    title: 'مستلزمات وإكسسوارات الكمبيوتر',
    description: 'كل ما تحتاجه لتجهيز مكتب عمل مريح أو بيئة دراسة وإنتاجية عالية الجودة.',
    image: '/src/assets/images/guide_workspace_tech_1795543534007.jpg',
    imageAlt: 'لابتوب فضي ولوحة مفاتيح لاسلكية وماوس وموزع منافذ على مكتب أبيض',
    items: [
      {
        title: 'لوحات المفاتيح والماوس المريح',
        subtitle: 'خيارات لاسلكية وميكانيكية للعمل الطويل',
        query: 'كيبورد وماوس لاسلكي مريح',
      },
      {
        title: 'موزعات USB-C ووحدات التخزين',
        subtitle: 'توسيع المنافذ وهاردات SSD السريعة لنقل الملفات',
        query: 'موزع USB-C وهارد SSD',
      },
      {
        title: 'حوامل اللابتوب وإضاءة المكتب',
        subtitle: 'رفع الشاشة لمستوى العين وإضاءة مريحة للعمل',
        query: 'حامل لابتوب ألمنيوم وإضاءة مكتب',
      },
    ],
  },
  {
    id: 'gifts-ideas',
    kicker: 'دليل الهدايا المختارة',
    title: 'أفكار هدايا مميزة لكل المناسبات',
    description: 'قوائم بحث سريعة تساعدك في اختيار هدية عملية وأنيقة تناسب الأهل والأصدقاء والزملاء.',
    image: '/src/assets/images/hero_egypt_shopping_1795543532954.jpg',
    imageAlt: 'إكسسوارات تقنية ومنزلية مناسبة للهدايا على خلفية بيضاء مشرقة',
    items: [
      {
        title: 'هدايا تقنية وعملية',
        subtitle: 'ساعات ذكية، سماعات لاسلكية، وقارئات كتب إلكترونية',
        query: 'ساعة ذكية وسماعة بلوتوث',
      },
      {
        title: 'هدايا العناية والعطور',
        subtitle: 'عطور أصلية ومجموعات عناية شخصية متكاملة',
        query: 'مجموعة هدايا عطور وعناية',
      },
      {
        title: 'هدايا القراءة والقهوة',
        subtitle: 'أكواب حرارية أنيقة وأدوات تحضير القهوة المختصة',
        query: 'أدوات قهوة مختصة وكوب حراري',
      },
    ],
  },
];
