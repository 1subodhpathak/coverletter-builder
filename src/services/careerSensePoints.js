const STORAGE_KEY = 'careersense_points_usage';
const POINTS_PER_USD = 10000;

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const readRecords = () => {
  if (!canUseStorage()) return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const recordCareerSenseUsage = ({
  feature,
  label,
  model,
  inputPoints = 0,
  outputPoints = 0,
  totalPoints = 0,
  status = 'Completed',
}) => {
  const points = Number(totalPoints) || Number(inputPoints) + Number(outputPoints);
  if (!canUseStorage() || points <= 0) return;

  const record = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    feature,
    label,
    model,
    inputPoints: Number(inputPoints) || 0,
    outputPoints: Number(outputPoints) || 0,
    totalPoints: points,
    status,
  };

  const records = [record, ...readRecords()].slice(0, 100);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const getCareerSenseUsage = () => {
  const records = readRecords();
  const totalPoints = records.reduce((sum, record) => sum + (Number(record.totalPoints) || 0), 0);

  return {
    records,
    totalPoints,
    totalBillUsd: totalPoints / POINTS_PER_USD,
  };
};
