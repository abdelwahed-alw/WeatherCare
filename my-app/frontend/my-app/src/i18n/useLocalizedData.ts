import { useLocale } from './LocaleContext';
import {
  homePage as mockHomePage,
  activitiesPage as mockActivitiesPage,
  common as mockCommon,
} from '../data/mockUIData';

export function useLocalizedData() {
  const { t } = useLocale();

  return {
    homePage: {
      hero: {
        liveLabel: t.home.hero.live,
        feelsLikePrefix: t.home.hero.feelsLike,
        aqi: t.home.hero.aqi,
        humidity: t.home.hero.humidity,
        wind: t.home.hero.wind,
      },
      whatToWear: {
        title: t.home.whatToWear.title,
        lightLayers: t.home.whatToWear.lightLayers,
        eyeProtection: t.home.whatToWear.eyeProtection,
        seeFullSuggestions: t.home.whatToWear.seeFull,
        uvHighText: t.home.whatToWear.uvHigh,
        uvModerateText: t.home.whatToWear.uvModerate,
      },
      forecast: {
        title: t.home.forecast.title,
        fullDetails: t.home.forecast.full,
        tomorrow: t.home.forecast.tomorrow,
      },
      dailyInsight: {
        title: t.home.insight.title,
        outdoorScore: t.home.insight.score,
        hydrationNeed: t.home.insight.hydration,
        quoteExtreme: t.home.insight.quoteExtreme,
        quoteWarm: t.home.insight.quoteWarm,
        quoteCool: t.home.insight.quoteCool,
      },
      weatherVisual: {
        outdoorLabel: t.home.weatherVisual.outdoor,
        indoorLabel: t.home.weatherVisual.indoor,
      },
      planYourActivity: {
        title: t.home.plan.title,
      },
      activityCards: mockHomePage.activityCards,
    },
    activitiesPage: {
      todayFocus: {
        title: t.activities.todayFocus.title,
        extremeHeat: t.activities.todayFocus.extreme,
        warm: t.activities.todayFocus.warm,
        optimal: t.activities.todayFocus.optimal,
        cool: t.activities.todayFocus.cool,
      },
      bestTime: {
        optimalWindow: t.activities.bestTime.window,
        morningClarity: t.activities.bestTime.morning,
        description: t.activities.bestTime.desc,
      },
      hydrationPlan: {
        title: t.activities.hydration.title,
        goal: t.activities.hydration.goal,
        goalReached: t.activities.hydration.reached,
        glassesToTarget: t.activities.hydration.glasses,
        wellDone: t.activities.hydration.wellDone,
        keepItUp: t.activities.hydration.keepUp,
        start: t.activities.hydration.start,
        history: t.activities.hydration.history,
      },
      startActivity: {
        title: t.activities.start.title,
        viewAll: t.activities.start.viewAll,
      },
      activities: mockActivitiesPage.activities,
      insights: {
        airQuality: t.activities.insights.air,
        excellent: t.activities.insights.excellent,
        moderate: t.activities.insights.moderate,
        uvWarning: t.activities.insights.uvWarn,
        uvLevel: t.activities.insights.uvLevel,
        highPollen: t.activities.insights.highPollen,
        lowPollen: t.activities.insights.lowPollen,
        uvExtreme: t.activities.insights.uvExtreme,
        uvHigh: t.activities.insights.uvHigh,
        uvLow: t.activities.insights.uvLow,
      },
    },
    healthPage: {
      header: {
        title: t.health.header.title,
        subtitle: t.health.header.subtitle,
      },
      uvIndex: {
        title: t.health.uv.title,
        extremeRisk: t.health.uv.extremeRisk,
        highRisk: t.health.uv.highRisk,
        peak: t.health.uv.peak,
        avoidSun: t.health.uv.avoidSun,
        limitSun: t.health.uv.limitSun,
        comfortable: t.health.uv.comfortable,
        seekShade: t.health.uv.seekShade,
        wearSpf: t.health.uv.wearSpf,
        noPrecautions: t.health.uv.noPrecautions,
      },
      spfCard: {
        label: t.health.spf.label,
        setTimer: t.health.spf.setTimer,
        timerSet: t.health.spf.timerSet,
      },
      hydrationStatus: {
        title: t.health.hydration.title,
        goal: t.health.hydration.goal,
        reached: t.health.hydration.reached,
      },
      allergyAlert: {
        title: t.health.allergy.title,
        riskLevel: t.health.allergy.risk,
        highRisk: t.health.allergy.high,
        moderateRisk: t.health.allergy.moderate,
        lowRisk: t.health.allergy.low,
        grassPollen: t.health.allergy.grass,
        treePollen: t.health.allergy.tree,
        dustMold: t.health.allergy.dust,
      },
      wellnessRoutine: {
        title: t.health.wellness.title,
        subtitle: t.health.wellness.subtitle,
        eyeProtection: t.health.wellness.eye,
        wearSunglasses: t.health.wellness.sunglasses,
        sunglassesOptional: t.health.wellness.optional,
        airQuality: t.health.wellness.air,
        aqiExcellent: t.health.wellness.aqi,
        breathingExercise: t.health.wellness.breathe,
        limitOutdoor: t.health.wellness.limit,
        notAvailable: t.health.wellness.unavailable,
      },
    },
    profilePage: {
      wellnessScore: t.profile.score,
      premiumMember: t.profile.premium,
      preferences: {
        title: t.profile.preferences.title,
        darkMode: t.profile.preferences.dark,
        darkModeDesc: t.profile.preferences.darkDesc,
        defaultCity: t.profile.preferences.city,
        defaultCityDesc: t.profile.preferences.cityDesc,
        language: t.profile.preferences.lang,
        languageDesc: t.profile.preferences.langDesc,
      },
      notifications: {
        title: t.profile.notifications.title,
        dailyAlerts: t.profile.notifications.daily,
        dailyAlertsDesc: t.profile.notifications.dailyDesc,
        heatWave: t.profile.notifications.heat,
        heatWaveDesc: t.profile.notifications.heatDesc,
        allergy: t.profile.notifications.allergy,
        allergyDesc: t.profile.notifications.allergyDesc,
      },
      account: {
        clearCache: t.profile.account.clear,
        signOut: t.profile.account.signOut,
        cacheCleared: t.profile.account.cleared,
        signingOut: t.profile.account.signing,
      },
    },
    common: {
      appName: `${t.app.name} ${t.app.tagline}`,
      profileEdit: mockCommon.profileEdit,
      fullDetails: mockCommon.fullDetails,
      settings: t.settings,
      footerTagline: t.common.footer,
      languageEnglish: mockCommon.languageEnglish,
    },
  };
}
