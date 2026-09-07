import type { ArchivePhoto } from "@/lib/portfolio-archive";
import { buildPhotographyCatalogue as buildBasePhotographyCatalogue } from "@/lib/photography-classifier";
import {
  PHOTO_STYLES,
  PHOTOGRAPHY_SERIES as BASE_PHOTOGRAPHY_SERIES,
  type CataloguePhoto,
  type PhotographySeriesDefinition,
  type PhotographySeriesSlug,
  type PhotographyStyle,
} from "@/lib/photography-series";

export { PHOTO_STYLES };
export type {
  CataloguePhoto,
  PhotographySeriesDefinition,
  PhotographySeriesSlug,
  PhotographyStyle,
} from "@/lib/photography-series";

// Bare DJI counters reset across years, so destination corrections below are keyed by
// the stable Drive/archive asset ID after capture-date and GPS review.
const NORMALISED_BASE_SERIES: PhotographySeriesDefinition[] = BASE_PHOTOGRAPHY_SERIES.map((series) => {
  if (series.slug === "preca-italy") {
    return {
      ...series,
      slug: "aprica-italy",
      title: "Aprica, Italy · 11–15 February 2024",
      kicker: "11–15 Feb 2024",
      location: "Aprica, Italy",
      description:
        "A February 2024 Alpine aerial series around Aprica, joined with the GPS-tagged ground photographs from the same trip.",
      sortDate: "2024-02-15",
      coverId: "1P5bDpe3atxaIUqrHemn7lvDcOE7GKyEe",
    };
  }

  if (series.slug === "architecture-2025-02-22") {
    return {
      ...series,
      title: "London Architecture in Monochrome · February–May 2025",
    };
  }

  if (series.slug === "barcelona-aerial") {
    return {
      ...series,
      title: "Barcelona · 11 August 2023",
      kicker: "11 Aug 2023",
      location: "Barcelona, Spain",
      description:
        "An aerial Barcelona sequence photographed on 11 August 2023 and recovered from the older mixed-location groupings.",
      sortDate: "2023-08-11",
      coverId: "1JkfyqszwoxTVomHhok1oAbh7tn_5BU38",
    };
  }

  if (series.slug === "highlands-2022-08") {
    return {
      ...series,
      title: "Scottish Highlands · 10–12 August 2022",
      kicker: "10–12 Aug 2022",
      location: "Scottish Highlands, UK",
      description:
        "A multi-day aerial journey through the western Scottish Highlands, kept separate from the following Glenfinnan shoot.",
      sortDate: "2022-08-12",
      coverId: "19Xq6zi6JNtYSZZ3Cc4wuWNX9pWEBWDvl",
    };
  }

  if (series.slug === "thailand-2021-12") {
    return {
      ...series,
      title: "Thailand · 8–24 December 2021",
      kicker: "8–24 Dec 2021",
      location: "Thailand",
      description:
        "An early Thailand aerial series reconstructed from the original dated and GPS-tagged DJI files.",
      sortDate: "2021-12-24",
    };
  }

  return series;
});

const ADDITIONAL_SERIES: PhotographySeriesDefinition[] = [
  {
    slug: "heidelberg-2024-06-24",
    title: "Heidelberg · 24 June 2024",
    kicker: "24 Jun 2024",
    location: "Heidelberg, Germany",
    description: "Aerial views over Heidelberg and the Neckar, recovered from the original GPS-tagged June 2024 files.",
    coverId: "18j0oSQh1uOG5SybAwDD7T7iLw5urggnz",
    sortDate: "2024-06-24",
    public: true,
  },
  {
    slug: "cologne-2024-06-19",
    title: "Cologne · 19 June 2024",
    kicker: "19 Jun 2024",
    location: "Cologne, Germany",
    description: "A compact aerial study of central Cologne, identified from the original GPS metadata.",
    coverId: "10z3Pj9bpQ1VlPx-5AAqXJjfRVnNQrnNL",
    sortDate: "2024-06-19",
    public: true,
  },
  {
    slug: "thailand-2023-12",
    title: "Thailand · December 2023",
    kicker: "Dec 2023",
    location: "Thailand",
    description: "A tropical aerial sequence from the December 2023 Thailand trip, restored from dated DJI originals.",
    coverId: "1iaOUarxwJwsO_yorstLjBluNdMf5vAhY",
    sortDate: "2023-12-22",
    public: true,
  },
  {
    slug: "mexico-2023-08-28",
    title: "Mexico · 28 August–3 September 2023",
    kicker: "28 Aug–3 Sep 2023",
    location: "Nayarit, Mexico",
    description: "Aerial travel work from the Nayarit coast, with GPS-confirmed photographs spanning late August into early September.",
    coverId: "1JUIaXq9x9Tw4L7dA_NK1DH7o1yogC4wp",
    sortDate: "2023-09-03",
    public: true,
  },
  {
    slug: "rome-2023-08-19",
    title: "Rome · 19 August 2023",
    kicker: "19 Aug 2023",
    location: "Rome, Italy",
    description: "Aerial views across Rome, separated from the surrounding Mediterranean trip using capture dates and GPS.",
    coverId: "18RLQMs_fcBes9yQ8Uuw8jzWduf2klrPv",
    sortDate: "2023-08-19",
    public: true,
  },
  {
    slug: "pisa-2023-08-18",
    title: "Pisa · 18 August 2023",
    kicker: "18 Aug 2023",
    location: "Pisa, Italy",
    description: "A concise aerial Pisa sequence recovered from GPS-tagged originals.",
    coverId: "1DhZWN-XsofeHsWe-JWTLpg_CYS7ptw7F",
    sortDate: "2023-08-18",
    public: true,
  },
  {
    slug: "ajaccio-2023-08-17",
    title: "Ajaccio · 17 August 2023",
    kicker: "17 Aug 2023",
    location: "Ajaccio, Corsica, France",
    description: "An aerial stop in Ajaccio, identified from the original capture metadata.",
    coverId: "1FMB8fBSgWIL3gACRz5HfbTRqaWM7aS9r",
    sortDate: "2023-08-17",
    public: true,
  },
  {
    slug: "portofino-2023-08-16",
    title: "Portofino · 16 August 2023",
    kicker: "16 Aug 2023",
    location: "Portofino, Liguria, Italy",
    description: "Aerial coastline and harbour photography around Portofino, recovered from a run previously confused with an older UK shoot.",
    coverId: "1ZY4A33SkKyZ_tlv2V1eaqfNIAmSw0o-6",
    sortDate: "2023-08-16",
    public: true,
  },
  {
    slug: "valencia-2023-08-13",
    title: "Valencia · 13 August 2023",
    kicker: "13 Aug 2023",
    location: "Valencia, Spain",
    description: "Aerial city views from Valencia, identified directly from GPS and capture-date metadata.",
    coverId: "1TbT9H4InQUp6ZZBQ6ntI3ZTm8HOI8eCw",
    sortDate: "2023-08-13",
    public: true,
  },
  {
    slug: "london-2023-06-25",
    title: "East London · 25 June 2023",
    kicker: "25 Jun 2023",
    location: "Shoreditch, London, UK",
    description: "A small East London street and city sequence recovered from a GPS-tagged archive photograph.",
    coverId: "159dPGyJgWKSv7_wWvpTC6Xlagm7YFUui",
    sortDate: "2023-06-25",
    public: true,
  },
  {
    slug: "costa-brava-2023-04-20",
    title: "Costa Brava · 20–21 April 2023",
    kicker: "20–21 Apr 2023",
    location: "Costa Brava, Spain",
    description: "Aerial coastal photography from the Costa Brava, grouped from two consecutive GPS-confirmed shooting days.",
    coverId: "1O7myO-76WfqkIxsb-ZbqSc48_bERzGBW",
    sortDate: "2023-04-21",
    public: true,
  },
  {
    slug: "iceland-2023-03-11",
    title: "Iceland · 11–12 March 2023",
    kicker: "11–12 Mar 2023",
    location: "South & West Iceland",
    description: "A two-day aerial journey across Iceland, reconstructed from GPS-tagged DJI originals.",
    coverId: "1bI8xLP7VmwpqErUMdgRFhSKzjFzIgN9F",
    sortDate: "2023-03-12",
    public: true,
  },
  {
    slug: "thailand-2022-12",
    title: "Thailand · December 2022",
    kicker: "Dec 2022",
    location: "Thailand",
    description: "A December aerial travel series recovered from the original GPS-tagged DJI archive.",
    coverId: "1GHnmmZYSbCIA4liatWu9bbN2_bJ2Fqkn",
    sortDate: "2022-12-23",
    public: true,
  },
  {
    slug: "lake-district-2022-08-09",
    title: "Ambleside & Lake District · 9 August 2022",
    kicker: "9 Aug 2022",
    location: "Ambleside, Lake District, UK",
    description: "Aerial landscape work around Ambleside and the central Lake District, identified from the original GPS metadata.",
    coverId: "1rxzSjW7zYL8Ix78hCHxa-b-ruV5lf0qW",
    sortDate: "2022-08-09",
    public: true,
  },
  {
    slug: "buckinghamshire-2022-07-07",
    title: "Buckinghamshire · 7–8 July 2022",
    kicker: "7–8 Jul 2022",
    location: "Buckinghamshire, UK",
    description: "An early local aerial sequence from Buckinghamshire, separated from the travel archive using capture metadata.",
    coverId: "18fG-pl01Arx714j_5AqmEPohMAl6jdui",
    sortDate: "2022-07-08",
    public: true,
  },
  {
    slug: "dublin-2022-06-11",
    title: "Dublin · 11 June 2022",
    kicker: "11 Jun 2022",
    location: "Dublin, Ireland",
    description: "Aerial views over Dublin recovered from the original GPS-tagged export sequence.",
    coverId: "1a-iHK6t2ZZh5kA1n12O3TXZ97dl-XJc-",
    sortDate: "2022-06-11",
    public: true,
  },
  {
    slug: "loch-lomond-2021-09-04",
    title: "Loch Lomond · 4 September 2021",
    kicker: "4 Sep 2021",
    location: "Loch Lomond, Scotland",
    description: "An early Scottish aerial photograph identified from its retained GPS metadata.",
    coverId: "1wZ2126bqqSo6ARbN_RuvAjvLhQgq8Qgf",
    sortDate: "2021-09-04",
    public: true,
  },
];

export const PHOTOGRAPHY_SERIES = [...NORMALISED_BASE_SERIES, ...ADDITIONAL_SERIES].sort(
  (a, b) => b.sortDate.localeCompare(a.sortDate),
);

const PUBLIC_SERIES_TITLES = new Map(
  PHOTOGRAPHY_SERIES.map((series) => [series.slug, series.title]),
);

const VERIFIED_PROJECT_IDS: Record<PhotographySeriesSlug, readonly string[]> = {
  "thailand-2021-12": [
    "1_iKfJFpHW1cVnxmwK2jRJjcvmYa7fJAx",
    "1U4U69RxFK5hcF1HTjzuz8oEyEhij4rbI",
    "1zHdPb9ey1ip09CaY03ssyRweNtpB0bg3",
    "1CC03lO5DjscC6KWKrQd0JBFWDA0AzR0B",
    "1F6wAA3ymHC6Rq8rN72wVUlmcNgWKSOQc",
    "1F_d5zR9Z_4L6S2y18jWtf62Au8o1Vj-F",
    "1mGYDACDzw3UejZ_0Ndyq8KIRW_JjebN3",
    "1sx3TwUsMcp3DTxhkeR1tq9_8bW0MC2S6",
    "1xTDk9S_WugHpScP21WhGTG3f3Fo-ZoqA",
  ],
  "loch-lomond-2021-09-04": [
    "1wZ2126bqqSo6ARbN_RuvAjvLhQgq8Qgf",
  ],
  "dublin-2022-06-11": [
    "1a-iHK6t2ZZh5kA1n12O3TXZ97dl-XJc-",
    "1D98tixug62CxBxrXz16rAFV3hik3BR6A",
    "1VXZ6BBpF2GkxMVnEcejuqeSDbPyYb5A6",
    "1xngJbQCAbfhKQhKu1Qmk8dZB2HB0mLvA",
    "1fpeSttFSYZQcFZUlpxgTlcoORSNCwxRY",
    "1dP3KP2oT2jvZUFHWFh_6IrdDNgA6-cLU",
    "1IQfyu1n4Pb8wmevPQnzR9iU74QrSN4US",
    "1U2BmRh5IJD94Aygq5P1Z5b5RDRoThsfU",
    "1xClDYKYeDkk_3DqJAYgCWMYRTN16drk6",
    "1ZUbaLb900LMt_CxvuU5Jk1F1G7iEOSeh",
  ],
  "buckinghamshire-2022-07-07": [
    "18fG-pl01Arx714j_5AqmEPohMAl6jdui",
    "1mDKIrxEHK7PzAbxNPRVz3gVmea2T-lxV",
    "1kxBqcDuZHwmBpzu-2mN3YIOPoYOF3C93",
    "1KlJelHNXiwBJaXTR1KVwaBpSzqfiaTyB",
  ],
  "lake-district-2022-08-09": [
    "1rxzSjW7zYL8Ix78hCHxa-b-ruV5lf0qW",
    "1-61sJUbGW_TOF5ibmrLiyNRgadmypV2V",
    "1z_UuguzziasSHeeniGFnNhk-PTJ0_UdH",
    "1v98VaABjcsY6ckuZZ_oJDdIOfJ9F8NmH",
  ],
  "highlands-2022-08": [
    "14NfIexKEekpPZRkeqlILUGE8l-t8DZEJ",
    "1ipaGqOUOpOR2vJkbS_PaKgCHr-rFVSYo",
    "1IAgmAEcK3D0FFwOfJS40cw1hMFyRFo24",
    "1CiluOU_wPe0IRBF6ERJB4MFyIFh59dTX",
    "18r2eOrfR1sMbrC1dVhiVV8JSwvVlWC4G",
    "1M1RL5htPkKypVctJD-LBAZAlm16GykNw",
    "1O9DkK4YiJ0fIOaT3TL3zvGU248QSpyRP",
    "1XLNR9KEqpW089rQZUw04J66V8FwaGqcl",
    "1jcRC6RJnoPN10Skoowu8y3iUVE23TSbl",
    "19Xq6zi6JNtYSZZ3Cc4wuWNX9pWEBWDvl",
    "16NiROvNk1ulRawPfaDsYK1vqeyXyodZU",
    "1vPUOUjqCMRFH_Ekt-_HBTNr-_BJipwQM",
    "1yjNzZAV0yRhXhZwfOojiy0jnkphzgHlW",
    "1iwQLkBDJuT4jiRBlEjReY0ofeqCWMp5V",
  ],
  "glenfinnan-2022-08-13": [
    "1brvBeAr_V3HreAuopD87U6K0hxffR63F",
    "12qI9G0HbbkaHEZ7A9197XuZZmNDvfQWO",
    "14miALXceT7Hhv3uJUQPfp3leW915ERYx",
    "1oq37ARkdCLOkJVEysxMw9EVDnMfkJJwp",
    "1kMvubQjpS4-dTUyH8PVh6jmmE_qKjZs7",
    "11eU6jK5EJ-4-k43_6hwLvtH1o2gfC_ck",
    "1vCg_rR6mQXCGfzpH1NDX5COYDfCLB76M",
    "1T084Rk56_40n8LSIUzns31PS5cuZKX9A",
    "1W4D_oQFOmkoH1vQ38qKV-Idgyjcwumqg",
    "1lLu__3ifILwwU6nQfyn4TXzVPIYMhXbR",
    "1yfGjc6HSU9Ucb8RZtW6TuPJWSr6aw3hu",
    "1sv5yyDPNZ_mFCKXJPnjWu_zS34rxo8vQ",
    "13kVluyNVuAUMpYmWwa72hlB0RYh1ueLp",
    "1ZbGNeeEjz_DjtzOc1Zmni9aAYBIUrym3",
    "1PwU4V7MLvd4EhP2O3NMv2y1Cmz8YpMAC",
    "1QM9RHbHQ4tQmHJYZD5oDmlb2rwnt1EzY",
    "1x5jisp9aD4olWuaJ9A_XAqWgHMgHOaz8",
    "1yWQzrYsXHtmWTNhaYU_BoJrxrPgl7CTm",
    "1O5GAFfTni_fv_IdiXXYfjCjVwkpSNinK",
    "1oskp673kCdrXFL58cAh2dp9LQlJukf8I",
    "13-67VGK_9eAa9sUCd3Rf6ckVMvQVLxcr",
    "1BiXZsxpug0gUBySpUCtqkjtmVhH4OAZR",
    "1ufNVH3Klc5lOuAFOX72Ix9-iGIiuuzoA",
    "1_MFBjJ7CpHInlJi6ybWYuOtd6oAXY0XL",
  ],
  "edinburgh-2022-08-19": [
    "1KsyJNqTBXuHYKp-WgQQnBNnZ2gfg0CdD",
    "1n8FrOrNcoAAFo7YPCc9gLXr2V74h3AQI",
    "1Osci6_0rA-KCohsqrq76pBCrqrmlXPR_",
    "1BuR0x0mmE7XkXIw783u0nXjDqVdyNuRO",
    "1rZ8CfL-jxNhqoQAHlloStgaL5f7DYlvZ",
    "1t83jNlZd2QWhqAM7RIAZJKtz_m_QiqBD",
    "1wAUh2NxSRzmdcVUHetTf_k8J2TLqmg8I",
    "1MtfF7lXAUvhCZCEkqxSITcEjb2PGA1YQ",
    "1HYaDRBblLLYsbnn_i7rj5VBMDxAUHp8w",
    "1KO52_NSoUX9uXOu4QeGfWv7dy16qTaY8",
    "1-kyHkCwTnRKQp_fWiTIxdCeMBIfyb2-E",
  ],
  "flamborough-2022-08-19": [
    "1wCawwinX-Qkrxcn6eIGLh4jyuHJIW1Ap",
    "1HrG2XCvnODDZkvjL28aoysjtY2YPY8_p",
    "18L7VUTpo3hWL05vddgRG4TGaUc9ifeC6",
    "1ZmHzlLge7NVjUBOuYt1BM1WR5OPsqzwr",
    "1vTVT_XwLu4uriWjBVsfQIDpVtgY-0ON3",
    "1a4h2_od7n-ZeECoHCp_RKBSj0SBJukXa",
  ],
  "thailand-2022-12": [
    "1_sJUGMy0iN7p_qbVa2np5NtPvk1QjGyO",
    "14jGGc1Po0K38NUA0XgC65tTm1jnHfxJh",
    "1rSmHck_rr1KFzImXF2TVBuDg9b16XLj8",
    "18Qt0R56eUV9JVpgPrrPXiHPYP0KyVw4h",
    "1JaZWt2eWJk2epCwW5-OmarLjxNNsVEHl",
    "13gEPPHauTC4Bw259fCQHjI_xgM6garR-",
    "1P8nTS9F3ruPVrKOo-2QKzmIOQKNV_3Hp",
    "1sR-ygghcwk_xcJjOKvG4vMcziW-uIQYY",
    "1Av6pTs51WUeyYSrHLVkjj7OC4lEshBXt",
    "1wl7Z50FIUjJUxLYTRyPL9z3v9uSngbGE",
    "1tvJyiiCgDnXG87iZ_34bsqBitQyJ0Mmk",
    "1uF8Cdcvj2Fa1qmhimP2pRiWAKKqbqbGy",
    "1jj4DDUahb_K_JXIXP5DKSdmgvVqhmocT",
    "1Uil4mVWwsW-8VacGurky2IgIL9bT6-9D",
    "1GHnmmZYSbCIA4liatWu9bbN2_bJ2Fqkn",
    "1P0W9tD0-0ejAO2zuwm5gOK7782w0PeQO",
    "1ZzOGSK1qmCNS4JLGgjnhlhcEVkt28Z1V",
    "1AOOVgPG6LUiIt-wLyn1HRifbX1veUiMD",
    "1WgMTzigNL6L_vtYWTUTevKBCbcTNHrO-",
    "1nuJRsiMqXQvhMj1yLPJz6RHEyzbSf1pX",
    "1V__VB1q54qY_aJ02zL_0uclLHzsyEUiY",
  ],
  "iceland-2023-03-11": [
    "1bI8xLP7VmwpqErUMdgRFhSKzjFzIgN9F",
    "1dXChYr_XrWwej23OqcFzHAfFWCWya-5Q",
    "1ZrduGksF-ubNiOpKko693-Cn_sIR-M5u",
    "1YMS8XxngI774fEf_2wq0i6tnSm8E6JsR",
    "10Mlz1-obsYO_aYC9Ac5j9WGkhF27F08W",
    "1z3o3k8f0LDhnrxjxTSgXmGLCUrkyMnGy",
    "1jzb5fOrMaFOk1i7vEqUgOPyAlVbkUfS0",
    "1oL0lij-TzovU9PtogBQwzty1Ih8OpPjZ",
    "1-0iHqq5AryQ5qaP_z0YVRr-SIprHyAXn",
    "1ocjt7Ntzu1PcQ_H3ItyUQRMoLhUg8Sv8",
    "1OQCWeLxuONjAiwAhPQ4S4kAFE9bMxt-_",
    "1GI4NH2JMzBQ72DD6OwYOmY1R8gywCwZK",
    "1QI5epRsJbT1YsY27JkbwdI0V86EPVtJ0",
    "1VVl_HJkH1V9M2fk6RnB7aDX0-1b34ury",
    "1nUVDLNa4aVArfIFR0VYIAXHtrmxuVBCg",
    "1OyJOlnN5Yqq9zxj7QiSAG82mkX68eheG",
    "1hr49vTNABBGl3yl_gTEQNlF2UaWVvoE9",
    "1eTBRWRHj8rpaeVvemwE1jyJ-4bDalqlc",
    "1YWkV_OaG_MLusp5F4_ifvs19UPOFIXr4",
    "1yYCbjUtgB6ru2PVwxpQ73ZsZS_5e8IOb",
    "15Zlu-Ym2lG2F8PjvupHudYPnJPa_vy80",
    "1giBl8roDjCK3VKynehf2D2OsnKy_GndT",
    "1nT1i4ZzfLpR1HmF9EmW1ciPH7geMHD2S",
    "1V8Iaan7kwiqh6cGLlyu_Sr-9Lg9JMi1e",
  ],
  "costa-brava-2023-04-20": [
    "1O7myO-76WfqkIxsb-ZbqSc48_bERzGBW",
    "1q4KEozvNad15LD_cpMM8GZP5uSkEBabU",
    "1xq1N_2ZicjQ_qFB8xIDppFXqiusJyARs",
    "16c25H44I9IjqmS9GVsGe4gdbytiUxYXZ",
    "1Y7UMfFCbYr5vh4C33x8K2aCkH-t5wcId",
    "1ogO1Od7migCcRYmSgQ_6wMHMyyudwX3T",
    "1UyCEOCCRnVk-9TqDDbnHY90j9DSyfNMA",
    "1c06BeLWVbVXZyiyZcs6E3yNPNmoVieCT",
    "1f8ee0umX8bxOyK435to6wliCmIy49tvH",
    "1ub8vm9ggFXl-BGgB9ASfxGvGYa-BYKFu",
    "1k-Xybp6aejSt6o0cwlAf4Wi6qKvDTCZJ",
    "1gD78JeC5euSocsTKgwSChEAdvmcdTREe",
  ],
  "london-2023-06-25": [
    "159dPGyJgWKSv7_wWvpTC6Xlagm7YFUui",
  ],
  "barcelona-aerial": [
    "1JkfyqszwoxTVomHhok1oAbh7tn_5BU38",
    "1cslQyrm-lEbzDcURk-SbLEq7ySCGCe39",
    "19j3PajHkpHTeFmRgP_gcFoLeNtLH6B4A",
    "1dXAIeIjEI2TqlxNM0TkomX3WrX4fqODs",
    "1J0fXehrUHEg7KmPUuHaB9Uh5L_43VWbh",
    "13JHNrloSiiIPF3fg4r4pm-5ClDH5q1v4",
    "1YphA1ydcqvtJAlsgpRCAfFx5VOcegKTd",
  ],
  "valencia-2023-08-13": [
    "1TbT9H4InQUp6ZZBQ6ntI3ZTm8HOI8eCw",
    "1ivmw7BNoUs3FPljvOmnrLF0z0uoOrEec",
    "1zwy7UU0nJv3zfMUH3X8eKRF19RYpDob1",
  ],
  "portofino-2023-08-16": [
    "1N66nQ2SRHuvkZF-oJ09aC6TZ9n1Vah2z",
    "1mjq73UhDFym0cqfm3vwdx1a8oLj1JfBB",
    "1ZM_ah7Bf7nlFHYorLhEpL82doN17oBng",
    "19F4U-oNj99vxFQOHz7hOD0-SSHNoGjt3",
    "1QJSSNIW4rHfbHL5EYdjYDKQr2mWFZ_uV",
    "1X2dYbpOqvpWdXFqrWEgp6Yz6aEvxC2AA",
    "1tm3oLWL7gTsGY-NfaPn0njW2y7o5EBw9",
    "1UJ0WDPqhajGsu1VIOqp5NKdFbjbCLNZ9",
    "154lfmiGrrmZ9JixLCZODLyb2WrvgHyZt",
    "1ZY4A33SkKyZ_tlv2V1eaqfNIAmSw0o-6",
    "1NV5kobEpcfhvxw7Hk3KiNIHdVkg31-gj",
    "1MpGUZJHEkZW76ybem7XZ_btBfbfn59ou",
    "1_kkDJVC1XLIAr8V_TMt3aIvOxu6PtjpK",
    "1Y5z6K8I4sEdCpJodbtEvw8s55CElI7Ug",
    "11Hmg2AjIXQUcIdHSgxxwHhJw80NbkLlA",
    "140uX41MxDImFqsYbK4I1XUDHYCGi7rBP",
  ],
  "ajaccio-2023-08-17": [
    "1FMB8fBSgWIL3gACRz5HfbTRqaWM7aS9r",
  ],
  "pisa-2023-08-18": [
    "1DhZWN-XsofeHsWe-JWTLpg_CYS7ptw7F",
    "1rLbfWEQS2nZX1lZYmmnwyh4254vRgPJS",
  ],
  "rome-2023-08-19": [
    "1JZgaxazPnEbYfXobDGLcEbQxR1WotXYF",
    "15EjQ3Zmrj6uswrXg-orzOqcYQdDl5OOo",
    "1yN5gUkvg3SxSfnOTSzSFQSrbzO4qDzWb",
    "18RLQMs_fcBes9yQ8Uuw8jzWduf2klrPv",
  ],
  "mexico-2023-08-28": [
    "1_cpmLbrGssXbj4YCTZBswzu-FRQYd9di",
    "1br48_GsZ2Qu6IXMcJYD2ckHmg51x0auw",
    "1JUIaXq9x9Tw4L7dA_NK1DH7o1yogC4wp",
    "1z9GoOlga9h7lO2JW5U5yruSfMoANf3D4",
    "11K3MmqlY1MNErLLlZplZy7VLnvHNG4YI",
    "1qvUmEtJOryWhbmd8IqE10KJ903j8JA5C",
    "1AByxaxMIiv3fKvrPGycji6RfuU0xvX3c",
    "1nBzb-Ygpaz4JpiHRZ6I4V12Q_-DboAEy",
    "1m5K6CJNiGn5ja6JltuZXka8GjS2pTesw",
  ],
  "thailand-2023-12": [
    "11Hglbz_dBMqqeE4WUdL5MwCy2NPAGdl5",
    "1iaOUarxwJwsO_yorstLjBluNdMf5vAhY",
  ],
  "aprica-italy": [
    "1P5bDpe3atxaIUqrHemn7lvDcOE7GKyEe",
    "1RTiZyE5yH65OtfnnKNth4Y6DLgzIaZu0",
    "1hPeIMlsZeh8H7Py4ZuFzzXzCF9J6prw6",
    "1698jxtj-g1Gp9Go0oZf9Vl75FBnnMcE-",
    "1Ly7ngldMlcZxQwab4-a8PkvoCujr35CH",
    "18oQ92E5Vr-J69At6Ao32SLVWeb-bxUqW",
    "1YRqZ0ULNXENwhQRjwBavregvgpYFD0oh",
    "14joklGv2j-Y6Vpx-ZfXhza2XrhInxbFT",
    "1M_aULVf5bQDpmpY6wO1FZuewDXdK0YYA",
    "1seYlTiSwodEUOEfITf8dc3IKfBAp-98T",
    "1YajXTO8CLxdm1pYpkoYUYRJV58OzlGtJ",
    "1rMYlqcaAItDEWNgZij_qlXEF0wTk0MwA",
    "1chyi-zkIAdIcKps7Je3X5HbOJe5rfUE7",
    "1Bhuj8KZ4R4aWspQEUloSM-FV31BLQtD1",
  ],
  "cologne-2024-06-19": [
    "10z3Pj9bpQ1VlPx-5AAqXJjfRVnNQrnNL",
    "1SETedCb8UkqEZ0l_cWgn_2AZBaBBlyz8",
    "1_5VHiLv41h3t-k_rlQKhlHFi8hK6Kb7Y",
  ],
  "strasbourg-2024-06-21": [
    "19wEJ5-7vwpUlRy3D46Q-KGXs9J0Bxc97",
    "1I48N-yMxJF4WD3LaWAbgYgs4RoYsN0bK",
  ],
  "heidelberg-2024-06-24": [
    "18j0oSQh1uOG5SybAwDD7T7iLw5urggnz",
    "1K8QQkauODpXwPQVlOROGL_CPO4Fhp7GG",
    "1lM4zh2awTEkUZWaukbO9K3sxQzgCxL_B",
  ],
};

const VERIFIED_PHOTO_SERIES = new Map<string, PhotographySeriesSlug>(
  Object.entries(VERIFIED_PROJECT_IDS).flatMap(([seriesSlug, ids]) =>
    ids.map((id) => [id, seriesSlug] as const),
  ),
);

// A bare four-digit DJI filename is not a reliable location key: the aircraft counter
// wrapped between trips. Unreviewed examples stay in Open Archive until their asset ID
// has been verified instead of inheriting a destination from the number alone.
const AMBIGUOUS_CLASSIC_DJI_NAME =
  /^\s*DJI_\d{3,4}(?:-\d+)?(?:-Enhanced)?\.jpe?g$/i;

const SERIES_STYLE_HINTS: Partial<Record<PhotographySeriesSlug, PhotographyStyle[]>> = {
  "loch-lomond-2021-09-04": ["Landscape / Nature", "Travel / Documentary"],
  "dublin-2022-06-11": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "buckinghamshire-2022-07-07": ["Landscape / Nature"],
  "lake-district-2022-08-09": ["Landscape / Nature", "Travel / Documentary"],
  "highlands-2022-08": ["Landscape / Nature", "Travel / Documentary"],
  "glenfinnan-2022-08-13": ["Landscape / Nature", "Travel / Documentary"],
  "edinburgh-2022-08-19": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "flamborough-2022-08-19": ["Landscape / Nature", "Travel / Documentary"],
  "thailand-2021-12": ["Landscape / Nature", "Travel / Documentary"],
  "thailand-2022-12": ["Landscape / Nature", "Travel / Documentary"],
  "iceland-2023-03-11": ["Landscape / Nature", "Travel / Documentary"],
  "costa-brava-2023-04-20": ["Landscape / Nature", "Travel / Documentary"],
  "london-2023-06-25": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "barcelona-aerial": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "valencia-2023-08-13": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "portofino-2023-08-16": ["Architecture", "Landscape / Nature", "Travel / Documentary"],
  "ajaccio-2023-08-17": ["Architecture", "Landscape / Nature", "Travel / Documentary"],
  "pisa-2023-08-18": ["Architecture", "Travel / Documentary"],
  "rome-2023-08-19": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "mexico-2023-08-28": ["Landscape / Nature", "Travel / Documentary"],
  "thailand-2023-12": ["Landscape / Nature", "Travel / Documentary"],
  "aprica-italy": ["Landscape / Nature", "Travel / Documentary"],
  "cologne-2024-06-19": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "strasbourg-2024-06-21": ["Architecture", "Street / Urban", "Travel / Documentary"],
  "heidelberg-2024-06-24": ["Architecture", "Landscape / Nature", "Travel / Documentary"],
};

export function buildPhotographyCatalogue(photos: ArchivePhoto[]): CataloguePhoto[] {
  const sequenceBySeries = new Map<PhotographySeriesSlug, number>();

  return buildBasePhotographyCatalogue(photos).map((photo, index) => {
    const source = photos[index];
    const baseSeriesSlug =
      photo.seriesSlug === "preca-italy" ? "aprica-italy" : photo.seriesSlug;
    const verifiedSeriesSlug = source ? VERIFIED_PHOTO_SERIES.get(source.id) : undefined;
    const seriesSlug =
      verifiedSeriesSlug ??
      (source && AMBIGUOUS_CLASSIC_DJI_NAME.test(source.originalName)
        ? "open-archive"
        : baseSeriesSlug);
    const seriesTitle = PUBLIC_SERIES_TITLES.get(seriesSlug) ?? photo.seriesTitle;
    const sequence = (sequenceBySeries.get(seriesSlug) ?? 0) + 1;
    sequenceBySeries.set(seriesSlug, sequence);

    const hints = SERIES_STYLE_HINTS[seriesSlug] ?? [];
    const styles = Array.from(new Set<PhotographyStyle>([...photo.styles, ...hints]));

    return {
      ...photo,
      seriesSlug,
      seriesTitle,
      styles,
      title: `${seriesTitle} / ${String(sequence).padStart(3, "0")}`,
    };
  });
}
