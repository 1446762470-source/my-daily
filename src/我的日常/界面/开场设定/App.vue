<template>
  <div class="opening-setup">
    <!-- 标题 -->
    <div class="setup-header">
      <h2 class="setup-title">我的日常</h2>
      <p class="setup-subtitle">{{ currentStep === 1 ? '设定你的身份' : '设定你的背景' }}</p>
    </div>

    <!-- 步骤条 -->
    <div class="step-bar">
      <div :class="['step-dot', { done: currentStep >= 1, active: currentStep === 1 }]">
        <span class="step-num">1</span>
        <span class="step-text">身份</span>
      </div>
      <div class="step-line" :class="{ done: currentStep >= 2 }"></div>
      <div :class="['step-dot', { done: currentStep >= 2, active: currentStep === 2 }]">
        <span class="step-num">2</span>
        <span class="step-text">背景·钱财</span>
      </div>
    </div>

    <!-- ==================== 第1页：身份 + 性格 ==================== -->
    <div v-if="currentStep === 1">
      <!-- 基本信息 -->
      <section class="setup-section">
        <h3 class="section-label">
          <span class="section-icon">📋</span> 基本信息
        </h3>

        <div class="field-row">
          <label class="field-label">姓名</label>
          <input v-model="name" class="text-input" placeholder="输入你的名字" maxlength="20" />
        </div>

        <div class="field-row">
          <label class="field-label">性别</label>
          <div class="pill-row">
            <button v-for="g in genders" :key="g.value"
              :class="['pill', { active: selectedGender === g.value }]"
              @click="selectedGender = g.value">{{ g.label }}</button>
          </div>
        </div>

        <div class="field-row">
          <label class="field-label">年龄</label>
          <div class="pill-row">
            <button v-for="a in ages" :key="a.value"
              :class="['pill', { active: selectedAge === a.value }]"
              @click="selectedAge = a.value">{{ a.label }}</button>
          </div>
        </div>
      </section>

      <!-- 身份 -->
      <section class="setup-section">
        <h3 class="section-label">
          <span class="section-icon">🏫</span> 身份
        </h3>

        <div class="pill-row">
          <button v-for="id in identities" :key="id.value"
            :class="['pill', 'pill-lg', { active: selectedIdentity === id.value }]"
            @click="selectedIdentity = id.value">{{ id.label }}</button>
        </div>

        <!-- 学生 -->
        <div v-if="selectedIdentity === 'student'" class="sub-section">
          <div class="field-row">
            <label class="field-label">学校</label>
            <div class="pill-row">
              <button v-for="s in schools" :key="s.value"
                :class="['pill', { active: selectedSchool === s.value }]"
                @click="selectedSchool = s.value">{{ s.label }}</button>
            </div>
          </div>

          <div v-if="selectedSchool === 'soubu'">
            <div class="field-row">
              <label class="field-label">年级</label>
              <div class="pill-row">
                <button v-for="g in grades" :key="g.value"
                  :class="['pill', { active: selectedGrade === g.value }]"
                  @click="selectedGrade = g.value">{{ g.label }}</button>
              </div>
            </div>
            <div class="field-row">
              <label class="field-label">班级</label>
              <div class="pill-row">
                <button v-for="c in soubuClasses" :key="c.value"
                  :class="['pill', { active: selectedClass === c.value }]"
                  @click="selectedClass = c.value">{{ c.label }}</button>
              </div>
            </div>
            <div class="field-row">
              <label class="field-label">所属社团</label>
              <div class="pill-row">
                <button v-for="cl in clubs" :key="cl.value"
                  :class="['pill', { active: selectedClub === cl.value }]"
                  @click="selectedClub = cl.value">{{ cl.label }}</button>
              </div>
            </div>
          </div>

          <div v-if="selectedSchool === 'other'">
            <div class="field-row">
              <label class="field-label">学校名称</label>
              <input v-model="customSchool" class="text-input" placeholder="例如：丰之崎学园" maxlength="30" />
            </div>
            <div class="field-row">
              <label class="field-label">年级班级</label>
              <input v-model="customClass" class="text-input" placeholder="例如：高二A班" maxlength="20" />
            </div>
          </div>
        </div>

        <!-- 老师 -->
        <div v-if="selectedIdentity === 'teacher'" class="sub-section">
          <div class="field-row">
            <label class="field-label">任教学校</label>
            <input v-model="teacherSchool" class="text-input" placeholder="例如：总武高中" maxlength="30" />
          </div>
          <div class="field-row">
            <label class="field-label">科目 / 职务</label>
            <input v-model="teacherSubject" class="text-input" placeholder="例如：国语教师" maxlength="30" />
          </div>
        </div>

        <!-- 校外人士 -->
        <div v-if="selectedIdentity === 'outsider'" class="sub-section">
          <div class="field-row">
            <label class="field-label">身份描述</label>
            <input v-model="outsiderRole" class="text-input" placeholder="例如：大学生、上班族……" maxlength="30" />
          </div>
        </div>
      </section>

      <!-- 第1页按钮 -->
      <div class="setup-actions">
        <button class="btn-random" @click="handleRandom">
          <span>🎲 随机生成</span>
        </button>
        <button class="btn-primary" @click="currentStep = 2" :disabled="!name.trim()">
          <span>下一步</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>

    <!-- ==================== 第2页：系统选择 ==================== -->
    <div v-if="currentStep === 2">
      <section class="setup-section">
        <h3 class="section-label">
          <span class="section-icon">⚙️</span> 选择系统
          <span class="section-hint">只能选一个</span>
        </h3>

        <div class="sys-choice-grid">
          <button
            :class="['sys-choice-card', { active: selectedSystem === 'task' }]"
            @click="selectedSystem = 'task'"
          >
            <span class="sys-choice-icon">📋</span>
            <div class="sys-choice-info">
              <span class="sys-choice-name">任务系统</span>
              <span class="sys-choice-desc">每日发放 E~S 级任务，完成获得金钱和物品。S 级任务可获得超自然物品。</span>
            </div>
          </button>

          <button
            :class="['sys-choice-card', { active: selectedSystem === 'fate' }]"
            @click="selectedSystem = 'fate'"
          >
            <span class="sys-choice-icon">🃏</span>
            <div class="sys-choice-info">
              <span class="sys-choice-name">命运卡牌</span>
              <span class="sys-choice-desc">每日抽取命运/物品/事件/角色卡，让意外插曲推动日常走向。</span>
            </div>
          </button>
        </div>
      </section>

      <!-- 角色预览 -->
      <section class="setup-section preview-card" v-if="previewText">
        <h3 class="section-label">
          <span class="section-icon">👤</span> 角色预览
        </h3>
        <pre class="preview-content">{{ previewText }}</pre>
      </section>

      <p class="tbc-text">…… 更多系统开发中 ……</p>

      <!-- 第2页按钮 -->
      <div class="setup-actions">
        <button class="btn-back" @click="currentStep = 1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 5 19 12 12 19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>返回修改</span>
        </button>
        <button class="btn-primary" @click="handleStart" :disabled="!name.trim() || !selectedSystem">
          <span>确认开始</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// ===== 步骤 =====
const currentStep = ref(1);

// ===== 基本信息 =====
const name = ref('');
const genders = [
  { label: '♂️ 男', value: '男' },
  { label: '♀️ 女', value: '女' },
];
const selectedGender = ref('男');

const ages = [
  { label: '16岁 (高一)', value: '16岁，高中一年级' },
  { label: '17岁 (高二)', value: '17岁，高中二年级' },
  { label: '18岁 (高三)', value: '18岁，高中三年级' },
  { label: '20岁 (大学)', value: '20岁，大学生' },
  { label: '24岁 (社会人)', value: '24岁，步入社会' },
];
const selectedAge = ref('17岁，高中二年级');

// ===== 身份 =====
const identities = [
  { label: '🏫 学生', value: 'student' },
  { label: '📚 老师', value: 'teacher' },
  { label: '🚶 校外人士', value: 'outsider' },
];
const selectedIdentity = ref('student');

const schools = [
  { label: '总武高中', value: 'soubu' },
  { label: '其他学校', value: 'other' },
];
const selectedSchool = ref('soubu');

const grades = [
  { label: '高一', value: '一年级' },
  { label: '高二', value: '二年级' },
  { label: '高三', value: '三年级' },
];
const selectedGrade = ref('二年级');

const soubuClasses = [
  { label: 'J班', value: 'J班' },
  { label: 'F班', value: 'F班' },
  { label: 'C班', value: 'C班' },
];
const selectedClass = ref('J班');

const clubs = [
  { label: '侍奉部', value: '侍奉部' },
  { label: '学生会', value: '学生会' },
  { label: '足球部', value: '足球部' },
  { label: '篮球部', value: '篮球部' },
  { label: '文学部', value: '文学部' },
  { label: '美术部', value: '美术部' },
  { label: '归宅部', value: '归宅部（无社团）' },
];
const selectedClub = ref('侍奉部');

const customSchool = ref('');
const customClass = ref('');
const teacherSchool = ref('');
const teacherSubject = ref('');
const outsiderRole = ref('');

// ===== 第2页：系统选择 =====
const selectedSystem = ref('task'); // 'task' | 'fate' | ''

// ===== 预览 =====
const previewText = computed(() => {
  if (!name.value.trim()) return '';

  const parts: string[] = [];
  parts.push(`姓名：${name.value.trim()}`);
  parts.push(`性别：${selectedGender.value}`);
  parts.push(`年龄：${selectedAge.value}`);

  if (selectedIdentity.value === 'student') {
    if (selectedSchool.value === 'soubu') {
      parts.push(`身份：总武高中${selectedGrade.value}${selectedClass.value}`);
      parts.push(`社团：${selectedClub.value}`);
    } else {
      const sch = customSchool.value.trim() || '（未填写学校）';
      const cls = customClass.value.trim() || '（未填写班级）';
      parts.push(`身份：${sch} ${cls}`);
    }
  } else if (selectedIdentity.value === 'teacher') {
    const sch = teacherSchool.value.trim() || '（未填写学校）';
    const sub = teacherSubject.value.trim() || '（未填写科目）';
    parts.push(`身份：${sch} ${sub}`);
  } else {
    const role = outsiderRole.value.trim() || '（未填写身份）';
    parts.push(`身份：${role}`);
  }

  return parts.join('\n');
});

// ===== 构建 Prompt =====
function buildPrompt(): string {
  const sysLabel = selectedSystem.value === 'task' ? '任务系统' : '命运卡牌';

  return `请以"我"为以下设定的主角，开始故事：

${previewText.value}
启用系统：${sysLabel}

【开场流程】
1. 用 2~3 句话描写"我"早晨在家的场景——窗外天气、房间里的光线、日常的安静氛围。
2. 叙述"我"突然注意到眼前出现了一个半透明的面板——${sysLabel}。简单介绍它是什么：${selectedSystem.value === 'task' ? '每天会自动生成日常任务，完成任务可以获得金钱和物品奖励。今天是第一次激活，面板上缓缓浮现出两个任务……' : '每天会随机抽取一张命运卡牌，可能是好事、坏事，也可能是一次意外的邂逅。今天是第一次激活，一张卡牌在面板上缓缓翻面……'}
3. 插入 ${selectedSystem.value === 'task' ? '<daily_tasks>' : '<fate_card>'} 标签生成首批${selectedSystem.value === 'task' ? '任务' : '卡牌'}。
4. 之后把主动权完全交给玩家——不替玩家做任何决定。`;
}

// ===== 开始 =====
async function handleStart() {
  if (!name.value.trim()) return;
  try {
    await createChatMessages([{ role: 'user', message: buildPrompt() }]);

    // 根据用户选择开关对应的世界书条目
    await updateWorldbookWith('日常啊……', (entries) => {
      return entries.map((entry: any) => {
        if (entry.name === '任务系统') {
          return { ...entry, enabled: selectedSystem.value === 'task' };
        }
        if (entry.name === '命运卡牌') {
          return { ...entry, enabled: selectedSystem.value === 'fate' };
        }
        return entry;
      });
    });

    await triggerSlash('/trigger');
  } catch (e) {
    console.error('[开场设定] 初始化失败:', e);
    window.parent.toastr?.error('开场设定初始化失败，请刷新页面重试', '❌');
  }
}

// ===== 随机 =====
const maleNames = ['悠真', '颯太', '陽翔', '蓮', '湊', '大和', '陸', '瑛太', '優斗', '蒼'];
const femaleNames = ['陽菜', '結愛', '莉子', '美咲', '葵', '桜', '楓', '七海', '凛', '紬'];

function handleRandom() {
  selectedGender.value = Math.random() > 0.5 ? '男' : '女';
  const namePool = selectedGender.value === '男' ? maleNames : femaleNames;
  name.value = namePool[Math.floor(Math.random() * namePool.length)];
  selectedAge.value = ages[Math.floor(Math.random() * ages.length)].value;
  selectedIdentity.value = identities[Math.floor(Math.random() * identities.length)].value;
  selectedSchool.value = schools[Math.floor(Math.random() * schools.length)].value;
  selectedGrade.value = grades[Math.floor(Math.random() * grades.length)].value;
  selectedClass.value = soubuClasses[Math.floor(Math.random() * soubuClasses.length)].value;
  selectedClub.value = clubs[Math.floor(Math.random() * clubs.length)].value;

  customSchool.value = '';
  customClass.value = '';
  teacherSchool.value = '';
  teacherSubject.value = '';
  outsiderRole.value = '';
}
</script>

<style lang="scss" scoped>
// 青春书页 — 配色
$paper: #f9f5ec;
$page: #fefcf7;
$ink: #3d3428;
$ink-faded: #8b7f6e;
$ink-light: #b8ad9e;
$accent: #c47f5a;
$accent-light: #e8cfbe;
$accent-soft: #faf2eb;
$line: #e6ddd0;
$shadow: 0 1px 4px rgba(60, 40, 20, 0.06);
$shadow-lg: 0 3px 12px rgba(60, 40, 20, 0.08);
$radius: 4px;
$radius-sm: 3px;

.opening-setup {
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px 16px 28px;
  color: $ink;
  line-height: 1.7;
  background: repeating-linear-gradient(to bottom, transparent, transparent 27px, #e8e0d2 27px, #e8e0d2 28px);
  background-color: $paper;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(50,30,10,0.04), 0 8px 24px rgba(50,30,10,0.06);
  border: 1px solid #e5dccb;
}

// ===== 标题 =====
.setup-header {
  text-align: center;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 2px solid $line;
}
.setup-title {
  font-size: 1.4em;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $ink;
  margin: 0 0 6px;
}
.setup-subtitle {
  font-size: 0.82em;
  color: $ink-faded;
  margin: 0;
  font-style: italic;
}

// ===== 步骤条 =====
.step-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 16px;
}
.step-dot {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 2px;
  background: transparent;
  color: $ink-light;
  font-size: 0.8em;
  transition: all 0.3s;
  &.active {
    color: $accent;
    font-weight: 600;
    border-bottom: 2px solid $accent;
  }
  &.done { color: #8a9e8a; }
}
.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  font-weight: 700;
  background: currentColor;
  color: $page;
}
.step-text { font-size: 0.82em; letter-spacing: 0.04em; }
.step-line {
  width: 28px;
  height: 1px;
  background: $line;
  margin: 0 2px;
  &.done { background: #b5c9b5; }
}

// ===== 分区卡片 =====
.setup-section {
  background: $page;
  border-radius: $radius;
  padding: 16px 18px;
  margin-bottom: 10px;
  box-shadow: $shadow;
  border: 1px solid $line;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, transparent, $accent-light, transparent);
    border-radius: 3px 0 0 3px;
  }
}
.section-label {
  font-size: 0.88em;
  font-weight: 600;
  color: $ink;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.04em;
}
.section-icon { font-size: 1.05em; opacity: 0.7; }
.section-hint {
  font-size: 0.73em;
  font-weight: 400;
  color: $ink-light;
  margin-left: auto;
  font-style: italic;
}

// ===== 字段行 =====
.field-row {
  margin-bottom: 10px;
  &:last-child { margin-bottom: 0; }
}
.field-label {
  display: block;
  font-size: 0.78em;
  font-weight: 600;
  color: $ink-faded;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}

// ===== 文本输入 =====
.text-input {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 14px;
  border-radius: $radius-sm;
  border: 1px solid $line;
  background: #fdfaf4;
  color: $ink;
  font-size: 0.88em;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  &::placeholder { color: $ink-light; font-style: italic; }
  &:focus {
    border-color: $accent;
    background: $page;
    box-shadow: 0 0 0 2px rgba(196, 127, 90, 0.08);
  }
}

// ===== 子区域 =====
.sub-section {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dotted $line;
}

// ===== 药丸 =====
.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.pill {
  font-size: 0.78em;
  padding: 5px 12px;
  border-radius: 2px;
  border: 1px solid $line;
  background: #fdfaf4;
  color: $ink;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;
  letter-spacing: 0.03em;
  &:hover { border-color: $accent-light; background: $accent-soft; }
  &:active { transform: scale(0.97); }
  &.active {
    border-color: $accent;
    background: $accent-soft;
    color: darken($accent, 8%);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(196, 127, 90, 0.1);
  }
}
.pill-lg { font-size: 0.83em; padding: 7px 16px; }

// ===== 系统选择卡片 =====
.sys-choice-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sys-choice-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: $radius-sm;
  border: 1px solid $line;
  background: #fdfaf4;
  cursor: pointer;
  transition: all 0.22s;
  text-align: left;
  user-select: none;
  &:hover {
    border-color: $accent-light;
    background: $accent-soft;
    transform: translateX(3px);
  }
  &:active { transform: translateX(1px); }
  &.active {
    border-color: $accent;
    background: $accent-soft;
    box-shadow: 0 2px 8px rgba(196, 127, 90, 0.1);
    .sys-choice-name { color: darken($accent, 6%); }
  }
}
.sys-choice-icon {
  font-size: 1.5em;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
  opacity: 0.8;
}
.sys-choice-info {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column; gap: 3px;
}
.sys-choice-name {
  font-size: 0.88em; font-weight: 600; color: $ink;
  transition: color 0.2s; letter-spacing: 0.03em;
}
.sys-choice-desc {
  font-size: 0.76em; color: $ink-faded; line-height: 1.5;
}

// ===== 未完待续 =====
.tbc-text {
  text-align: center;
  font-size: 0.75em;
  color: $ink-light;
  letter-spacing: 0.1em;
  margin: 6px 0 2px;
  user-select: none;
  font-style: italic;
}

// ===== 预览 =====
.preview-card {
  background: #fdfaf4;
  border-color: #e8e0d2;
  &::before { display: none; }
}
.preview-content {
  margin: 0;
  font-size: 0.8em;
  line-height: 1.7;
  color: $ink-faded;
  font-family: inherit;
  white-space: pre-wrap;
  word-break: break-all;
}

// ===== 按钮 =====
.setup-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.btn-primary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: $radius-sm;
  border: none;
  background: $accent;
  color: #fff;
  font-size: 0.95em;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.22s;
  box-shadow: 0 2px 8px rgba(196, 127, 90, 0.25);
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(196, 127, 90, 0.3);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(196, 127, 90, 0.2);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }
  svg { flex-shrink: 0; }
}
.btn-random {
  padding: 12px 16px;
  border-radius: $radius-sm;
  border: 1px solid $line;
  background: $page;
  color: $ink-faded;
  font-size: 0.85em;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: $shadow;
  &:hover { border-color: $accent-light; background: $accent-soft; color: $ink; }
  &:active { transform: scale(0.97); }
}
.btn-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: $radius-sm;
  border: 1px solid $line;
  background: $page;
  color: $ink-faded;
  font-size: 0.85em;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow;
  svg { transform: rotate(180deg); flex-shrink: 0; }
  &:hover { border-color: $accent-light; background: $accent-soft; color: $ink; }
  &:active { transform: scale(0.97); }
}
</style>
