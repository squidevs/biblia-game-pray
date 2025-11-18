import { missionsManager as enhanced } from './missionsManagerEnhanced';
import { safeLocalStorage } from './storage';

const STORAGE_KEY = 'christon-mission-states-v2';

export type MissionState = {
  status?: string;
  startTime?: number;
  endTime?: number;
  [k: string]: any;
};

type RawState = Record<string, MissionState>;

const load = (): RawState => {
  try {
    const raw = safeLocalStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const save = (s: RawState) => {
  try {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
};

const initializeMissionStates = (missions: any[]) => {
  const s: RawState = load();
  missions.forEach(m => {
    if (!s[m.id]) {
      s[m.id] = { status: 'available' };
    }
  });
  save(s);
  return s;
};

const loadMissionStates = () => load();

const getMissionState = (id: string | number) => {
  const s = load();
  return s[id as any];
};

const acceptMission = (mission: any) => {
  const s = load();
  s[mission.id] = s[mission.id] || {};
  s[mission.id].status = 'in_progress';
  s[mission.id].startTime = Date.now();
  if (mission.timeEstimate) {
    s[mission.id].endTime = Date.now() + mission.timeEstimate * 60 * 1000;
  }
  save(s);
};

const completeMission = (mission: any) => {
  const s = load();
  s[mission.id] = s[mission.id] || {};
  s[mission.id].status = 'completed';
  s[mission.id].endTime = Date.now();
  save(s);
  // delegate to enhanced manager if possible (mission id numeric)
  try {
    const mid = Number(mission.id);
    if (!Number.isNaN(mid)) {
      enhanced.completeMission(mid, mission as any);
    }
  } catch {}
};

const abandonMission = (mission: any) => {
  const s = load();
  s[mission.id] = s[mission.id] || {};
  s[mission.id].status = 'abandoned';
  s[mission.id].endTime = Date.now();
  save(s);
  try {
    const mid = Number(mission.id);
    if (!Number.isNaN(mid)) {
      enhanced.giveUpMission(mid, mission as any);
    }
  } catch {}
};

const getTimeRemaining = (endTime?: number | Date) => {
  if (!endTime) return '00:00:00:00';
  const ts = typeof endTime === 'number' ? endTime : endTime.getTime();
  const diff = Math.max(0, ts - Date.now());
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const mins = Math.floor((diff % (60 * 60 * 1000)) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const computeEndTime = (schedule: string) => {
  const now = Date.now();
  let target = now;
  switch (schedule) {
    case 'daily':
      target = now + 24 * 60 * 60 * 1000;
      break;
    case 'weekly':
      target = now + 7 * 24 * 60 * 60 * 1000;
      break;
    case 'monthly':
      target = now + 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      target = now;
  }
  return new Date(target).toISOString();
};

const api = {
  initializeMissionStates,
  loadMissionStates,
  getMissionState,
  acceptMission,
  completeMission,
  abandonMission,
  getTimeRemaining
  ,computeEndTime
};

export default api;

// MissionState type is exported inline above
