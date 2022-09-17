export interface route {
  path: string;
  component: string;
  name: string;
  tag?:number
  icon?:string
  routes?: route[];
  isRender: true;
}
export default <route[]>[
  {
    path: '/',
    redirect: '/accounts',
  },
  {
    path: '/login',
    component: '@/pages/Login',
    name: 'login',
    headerRender: false,
    layout: false,
    routes: [
      {
        path: '/login/login-page',
        component: '@/pages/Login/login-page',
        name: 'loginPage',
      },
      {
        path: '/login/create-account',
        component: '@/pages/Login/create-account',
        name: 'CreateAccount',
      },
      {
        path: '/login/reset-password-lp',
        component: '@/pages/Login/reset-password-LP',
        name: 'ResetPasswordLP',
      },
      {
        path: '/login/email-otp',
        component: '@/pages/Login/email-otp',
        name: 'EmailOTP',
      },
      {
        path: '/login/reset-password',
        component: '@/pages/Login/reset-password',
        name: 'ResetPassword',
      },
      {
        path: '/login/successful-otp',
        component: '@/pages/Login/successful-otp',
        name: 'SuccessfulOtp',
      },
      {
        path: '/login/successful-prompt',
        component: '@/pages/Login/successful-prompt',
        name: 'SuccessfulPrompt',
      },
    ],
  },
  {
    path: '/accounts',
    component: '@/pages/Home/accounts',
    name: 'Accounts',
    isRender: true,
    icon:"icon-user",
    routes: [
      {
        path: '/accounts/valluna-accounts',
        component: '@/pages/Home/accounts/vallunaAccounts',
        name: 'Valluna Accounts',
        isRender: true,
        tag:1
      },
      {
        path: '/accounts/valluna-accounts/account-details',
        component: '@/pages/Home/accounts/vallunaAccounts/accountDetails',
        name: 'Account Details',
        isRender: false,
      },
      {
        path: '/accounts/user-groups',
        component: '@/pages/Home/accounts/userGroups',
        name: 'User Groups',
        isRender: true,
        tag:2
      },
      {
        path:'/accounts/user-groups/create-user-tag',
        component:'@/pages/Home/accounts/userGroups/CreateUserTag',
        name:'Create User Tag',
        isRender:false
      },
    ],
  },
  {
    path: '/permissions',
    component: '@/pages/Home/permissions',
    name: 'Permissions',
    isRender: true,
    icon:"icon-permissions",
    routes: [
      {
        path: '/permissions/overview',
        component: '@/pages/Home/permissions/overview',
        name: 'Overview',
        isRender: true,
        tag:3
      },
    ],
  },
  {
    path: '/scholars',
    component: '@/pages/Home/scholars',
    name: 'Scholars',
    isRender: true,
    icon:"icon-maozi",
    routes: [
      {
        path: '/scholars/scholar-accounts',
        component: '@/pages/Home/scholars/scholarAccounts',
        name: 'Scholar Accounts',
        isRender: true,
        tag:4
      },
      {
        path: '/scholars/scholar-accounts/create-new-scholar-account',
        component:
          '@/pages/Home/scholars/scholarAccounts/createNewScholarAccount',
        name: 'Create New Scholar Account',
        isRender: false,
      },
    ],
  },
  {
    path: '/axie-infinity',
    component: '@/pages/Home/axieInfinity',
    name: 'Axie Infinity',
    isRender: true,
    icon:"icon-youxijishoubing",
    routes: [
      {
        path: '/axie-infinity/performance',
        component: '@/pages/Home/axieInfinity/performance',
        name: 'Performance',
        isRender: true,
        tag:5
      },
    ],
  },
  {
    path: '/userInfo',
    component: '@/pages/Home/accounts/vallunaAccounts',
    isRender: false,
  },
];
