// 我的日常 一键配置 — 粘贴到 Tavern Helper 脚本并运行一次即可
(async function () {
  'use strict';

  // ===== 配置开场设定正则 =====
  await updateTavernRegexesWith(
    (regexes) => {
      const hasRegex = regexes.some((r) => r.script_name === '[界面]开场设定');
      if (hasRegex) return regexes;

      regexes.push({
        id: 'opening-setup-' + Date.now(),
        script_name: '[界面]开场设定',
        enabled: true,
        find_regex: '<OpeningSetup/>',
        replace_string:
          '<iframe src="https://testingcf.jsdelivr.net/gh/1446762470-source/my-daily/dist/%E6%88%91%E7%9A%84%E6%97%A5%E5%B8%B8/%E7%95%8C%E9%9D%A2/%E5%BC%80%E5%9C%BA%E8%AE%BE%E5%AE%9A/index.html" style="width:100%;height:520px;border:none;"></iframe>',
        trim_strings: [],
        source: { user_input: false, ai_output: true, slash_command: false, world_info: false },
        destination: { display: true, prompt: false },
        run_on_edit: true,
        min_depth: null,
        max_depth: null,
      });
      return regexes;
    },
    { type: 'character' },
  );

  window.parent.toastr.success('我的日常 — 开场设定界面配置完成！', '✅');

  // 运行一次后自毁
  var selfScript = getScriptTrees({ type: 'character' }).find(function (t) {
    return t.type === 'script' && t.name === '一键配置';
  });
  if (selfScript) {
    await updateScriptTreesWith(
      function (trees) {
        return trees.filter(function (t) { return t !== selfScript; });
      },
      { type: 'character' },
    );
  }
})();
