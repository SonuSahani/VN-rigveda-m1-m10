// menuOverlay.js - Comprehensive Visual Novel Menu System
(function () {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'vnOverlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 30;
    backdrop-filter: blur(2px);
  `;
  
  // Main panel
  const panel = document.createElement('div');
  panel.id = 'vnPanel';
  panel.style.cssText = `
    background: linear-gradient(180deg, rgba(12,10,30,0.98), rgba(18,16,40,0.98));
    padding: 24px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border: 1px solid rgba(255,255,255,0.06);
    color: white;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    font-family: Inter, "Segoe UI", Roboto, system-ui, sans-serif;
  `;
  
  // Title
  const title = document.createElement('h2');
  title.id = 'vnTitle';
  title.textContent = 'Ṛta’s Whisper';
  title.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.6rem;`;
  
  // Button grid
  const btnGrid = document.createElement('div');
  btnGrid.id = 'vnBtnGrid';
  btnGrid.style.display = 'grid';
  btnGrid.style.gap = '12px';
  
  // Main menu buttons
  const mainButtons = [
    { label: '▶ Resume', action: () => hideVNOverlay() },
    { label: '💾 Save Game', action: () => showSaveMenu() },
    { label: '📂 Load Game', action: () => showLoadMenu() },
    { label: '📜 Codex', action: () => { if (window.openCodex) window.openCodex(); hideVNOverlay(); } },
    { label: '🗣️ Debate Log', action: () => showDebateLog() },
    { label: '🎨 Gallery', action: () => showGallery() },
    { label: '🏆 Achievements', action: () => showAchievements() },
    { label: '⚙️ Settings', action: () => showSettings() },
    { label: '🌌 Mandala Menu', action: () => { if (window.showMenu) window.showMenu(); hideVNOverlay(); } },
    { label: '❌ Exit Game', action: () => { if (confirm('Are you sure you want to exit?')) window.close(); } }
  ];
  
  // Create main buttons
  mainButtons.forEach(btn => {
    const el = document.createElement('button');
    el.className = 'btn';
    el.textContent = btn.label;
    el.style.width = '100%';
    el.onclick = btn.action;
    btnGrid.appendChild(el);
  });
  
  // Settings panel
  const settingsPanel = document.createElement('div');
  settingsPanel.id = 'vnSettingsPanel';
  settingsPanel.style.display = 'none';
  
  const settingsTitle = document.createElement('h3');
  settingsTitle.textContent = 'Settings';
  settingsTitle.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.4rem;`;
  
  const settingsContent = document.createElement('div');
  settingsContent.innerHTML = `
    <div class="settings-group">
      <h4>Text Settings</h4>
      <div class="settings-row">
        <span>Text Speed</span>
        <input type="range" class="slider" id="textSpeedSlider" min="10" max="100" value="35">
      </div>
      <div class="settings-row">
        <span>Auto Play Speed</span>
        <input type="range" class="slider" id="autoPlaySlider" min="500" max="3000" value="1500">
      </div>
    </div>
    
    <div class="settings-group">
      <h4>Audio Settings</h4>
      <div class="settings-row">
        <span>BGM Volume</span>
        <input type="range" class="slider" id="bgmVolumeSlider" min="0" max="100" value="70">
      </div>
      <div class="settings-row">
        <span>SFX Volume</span>
        <input type="range" class="slider" id="sfxVolumeSlider" min="0" max="100" value="80">
      </div>
      <div class="settings-row">
        <span>Voice Volume</span>
        <input type="range" class="slider" id="voiceVolumeSlider" min="0" max="100" value="90">
      </div>
    </div>
    
    <div class="settings-group">
      <h4>Gameplay Settings</h4>
      <div class="settings-row">
        <span>Auto Advance</span>
        <label class="toggle-switch">
          <input type="checkbox" id="autoAdvanceToggle">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="settings-row">
        <span>Skip Unread Text</span>
        <label class="toggle-switch">
          <input type="checkbox" id="skipUnreadToggle">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <button class="btn" id="applySettingsBtn">Apply Settings</button>
      <button class="btn" id="backFromSettingsBtn" style="margin-left: 10px;">Back</button>
    </div>
  `;
  
  settingsPanel.appendChild(settingsTitle);
  settingsPanel.appendChild(settingsContent);
  
  // Save/Load panel
  const saveLoadPanel = document.createElement('div');
  saveLoadPanel.id = 'vnSaveLoadPanel';
  saveLoadPanel.style.display = 'none';
  
  const saveLoadTitle = document.createElement('h3');
  saveLoadTitle.id = 'saveLoadTitle';
  saveLoadTitle.textContent = 'Save Game';
  saveLoadTitle.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.4rem;`;
  
  const saveSlots = document.createElement('div');
  saveSlots.className = 'save-slots';
  saveSlots.id = 'saveSlots';
  
  const saveLoadControls = document.createElement('div');
  saveLoadControls.style.textAlign = 'center';
  saveLoadControls.style.marginTop = '20px';
  saveLoadControls.innerHTML = `
    <button class="btn" id="backFromSaveLoadBtn">Back</button>
  `;
  
  saveLoadPanel.appendChild(saveLoadTitle);
  saveLoadPanel.appendChild(saveSlots);
  saveLoadPanel.appendChild(saveLoadControls);
  
  // Gallery panel
  const galleryPanel = document.createElement('div');
  galleryPanel.id = 'vnGalleryPanel';
  galleryPanel.style.display = 'none';
  
  const galleryTitle = document.createElement('h3');
  galleryTitle.textContent = 'Gallery';
  galleryTitle.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.4rem;`;
  
  const galleryGrid = document.createElement('div');
  galleryGrid.className = 'gallery-grid';
  galleryGrid.id = 'galleryGrid';
  
  const galleryControls = document.createElement('div');
  galleryControls.style.textAlign = 'center';
  galleryControls.style.marginTop = '20px';
  galleryControls.innerHTML = `
    <button class="btn" id="backFromGalleryBtn">Back</button>
  `;
  
  galleryPanel.appendChild(galleryTitle);
  galleryPanel.appendChild(galleryGrid);
  galleryPanel.appendChild(galleryControls);
  
  // Achievements panel
  const achievementsPanel = document.createElement('div');
  achievementsPanel.id = 'vnAchievementsPanel';
  achievementsPanel.style.display = 'none';
  
  const achievementsTitle = document.createElement('h3');
  achievementsTitle.textContent = 'Achievements';
  achievementsTitle.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.4rem;`;
  
  const achievementList = document.createElement('div');
  achievementList.className = 'achievement-list';
  achievementList.id = 'achievementList';
  
  const achievementsControls = document.createElement('div');
  achievementsControls.style.textAlign = 'center';
  achievementsControls.style.marginTop = '20px';
  achievementsControls.innerHTML = `
    <button class="btn" id="backFromAchievementsBtn">Back</button>
  `;
  
  achievementsPanel.appendChild(achievementsTitle);
  achievementsPanel.appendChild(achievementList);
  achievementsPanel.appendChild(achievementsControls);
  
  // Debate Log panel
  const debateLogPanel = document.createElement('div');
  debateLogPanel.id = 'vnDebateLogPanel';
  debateLogPanel.style.display = 'none';

  const debateLogTitle = document.createElement('h3');
  debateLogTitle.textContent = 'Debate Log';
  debateLogTitle.style.cssText = `text-align: center; color: #ffd700; margin: 0 0 20px; font-size: 1.4rem;`;

  const debateLogList = document.createElement('div');
  debateLogList.id = 'debateLogList';
  debateLogList.style.display = 'grid';
  debateLogList.style.gap = '10px';

  const debateLogControls = document.createElement('div');
  debateLogControls.style.textAlign = 'center';
  debateLogControls.style.marginTop = '20px';
  debateLogControls.innerHTML = `
    <button class="btn" id="backFromDebateLogBtn">Back</button>
  `;

  debateLogPanel.appendChild(debateLogTitle);
  debateLogPanel.appendChild(debateLogList);
  debateLogPanel.appendChild(debateLogControls);
  
  // Assemble panels
  panel.appendChild(title);
  panel.appendChild(btnGrid);
  panel.appendChild(settingsPanel);
  panel.appendChild(saveLoadPanel);
  panel.appendChild(galleryPanel);
  panel.appendChild(achievementsPanel);
  panel.appendChild(debateLogPanel);
  overlay.appendChild(panel);
  
  // Replace the existing overlay if it exists
  const existingOverlay = document.getElementById('vnOverlay');
  if (existingOverlay) {
    existingOverlay.parentNode.replaceChild(overlay, existingOverlay);
  } else {
    document.body.appendChild(overlay);
  }
  
  // Menu state
  let currentPanel = 'main';
  
  // Functions to show/hide the overlay
  window.showVNOverlay = () => { 
    overlay.style.display = 'flex'; 
    showMainPanel();
  };
  
  window.hideVNOverlay = () => { 
    overlay.style.display = 'none'; 
  };
  
  // Panel navigation functions
  function showMainPanel() {
    currentPanel = 'main';
    btnGrid.style.display = 'grid';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'none';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'none';
    const debateLogPanel = document.getElementById('vnDebateLogPanel');
    if (debateLogPanel) debateLogPanel.style.display = 'none';
  }
  
  function showSettings() {
    currentPanel = 'settings';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'block';
    saveLoadPanel.style.display = 'none';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'none';
    
    // Load current settings
    if (window.state && window.state.settings) {
      document.getElementById('textSpeedSlider').value = window.state.settings.textSpeed;
      document.getElementById('autoPlaySlider').value = window.state.settings.autoPlaySpeed;
      document.getElementById('bgmVolumeSlider').value = window.state.settings.bgmVolume;
      document.getElementById('sfxVolumeSlider').value = window.state.settings.sfxVolume;
      document.getElementById('voiceVolumeSlider').value = window.state.settings.voiceVolume;
      document.getElementById('autoAdvanceToggle').checked = window.state.settings.autoAdvance;
      document.getElementById('skipUnreadToggle').checked = window.state.settings.skipUnread;
    }
  }
  
  function showSaveMenu() {
    currentPanel = 'save';
    document.getElementById('saveLoadTitle').textContent = 'Save Game';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'block';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'none';
    
    populateSaveSlots(true);
  }
  
  function showLoadMenu() {
    currentPanel = 'load';
    document.getElementById('saveLoadTitle').textContent = 'Load Game';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'block';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'none';
    
    populateSaveSlots(false);
  }
  
  function showGallery() {
    currentPanel = 'gallery';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'none';
    galleryPanel.style.display = 'block';
    achievementsPanel.style.display = 'none';
    
    populateGallery();
  }
  
  function showAchievements() {
    currentPanel = 'achievements';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'none';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'block';
    
    populateAchievements();
  }

  function showDebateLog() {
    currentPanel = 'debateLog';
    btnGrid.style.display = 'none';
    settingsPanel.style.display = 'none';
    saveLoadPanel.style.display = 'none';
    galleryPanel.style.display = 'none';
    achievementsPanel.style.display = 'none';
    const debateLogPanel = document.getElementById('vnDebateLogPanel');
    debateLogPanel.style.display = 'block';
    populateDebateLog();
  }
  
  // Populate save slots
  function populateSaveSlots(isSave) {
    const slotsContainer = document.getElementById('saveSlots');
    slotsContainer.innerHTML = '';
    
    for (let i = 1; i <= 6; i++) {
      const slot = document.createElement('div');
      slot.className = 'save-slot';
      
      const saveData = localStorage.getItem(`rta_save_slot_${i}`);
      
      if (saveData) {
        const data = JSON.parse(saveData);
        slot.innerHTML = `
          <div class="save-slot-title">Slot ${i}</div>
          <div class="save-slot-info">
            ${data.currentScene || 'Unknown Scene'}<br>
            Mandala: ${data.mandala || 0}<br>
            ${new Date(data.timestamp || Date.now()).toLocaleString()}
          </div>
        `;
      } else {
        slot.innerHTML = `
          <div class="save-slot-title">Slot ${i}</div>
          <div class="save-slot-info">Empty</div>
        `;
      }
      
      slot.onclick = () => {
        if (isSave) {
          if (window.doSave) {
            window.doSaveToSlot(i);
          }
        } else {
          if (window.doLoad) {
            window.doLoadFromSlot(i);
          }
        }
      };
      
      slotsContainer.appendChild(slot);
    }
  }
  
  // Populate gallery
  function populateGallery() {
    const galleryContainer = document.getElementById('galleryGrid');
    galleryContainer.innerHTML = '';
    
    // Sample gallery items - in a real game, these would be actual images
    const galleryItems = [
      { id: 'intro', title: 'The Beginning', unlocked: true },
      { id: 'apsara', title: 'Apsara Appears', unlocked: false },
      { id: 'gandharva', title: 'Gandharva Appears', unlocked: false },
      { id: 'agni', title: 'Realm of Agni', unlocked: false },
      { id: 'ritual', title: 'Sacred Ritual', unlocked: false },
      { id: 'puzzle', title: 'Mantra Puzzle', unlocked: false }
    ];
    
    // Check unlocked CGs from game state
    if (window.state && window.state.unlockedCGs) {
      galleryItems.forEach(item => {
        if (window.state.unlockedCGs.includes(item.id)) {
          item.unlocked = true;
        }
      });
    }
    
    galleryItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      if (item.unlocked) {
        galleryItem.innerHTML = `<img src="gallery/${item.id}.jpg" alt="${item.title}">`;
      } else {
        galleryItem.className += ' locked';
        galleryItem.innerHTML = '🔒 Locked';
      }
      
      galleryContainer.appendChild(galleryItem);
    });
  }
  
  // Populate achievements
  function populateAchievements() {
    const achievementsContainer = document.getElementById('achievementList');
    achievementsContainer.innerHTML = '';
    
    if (window.state && window.state.achievements) {
      Object.entries(window.state.achievements).forEach(([id, achievement]) => {
        const achievementEl = document.createElement('div');
        achievementEl.className = 'achievement';
        
        if (achievement.unlocked) {
          achievementEl.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-info">
              <div class="achievement-title">${achievement.title}</div>
              <div class="achievement-desc">${achievement.desc}</div>
            </div>
          `;
        } else {
          achievementEl.className += ' locked';
          achievementEl.innerHTML = `
            <div class="achievement-icon">🔒</div>
            <div class="achievement-info">
              <div class="achievement-title">???</div>
              <div class="achievement-desc">???</div>
            </div>
          `;
        }
        
        achievementsContainer.appendChild(achievementEl);
      });
    }
  }
  
  function populateDebateLog() {
    const list = document.getElementById('debateLogList');
    if (!list) return;
    list.innerHTML = '';
    let entries = [];
    try {
      const raw = localStorage.getItem('rta_debate_log');
      if (raw) entries = JSON.parse(raw);
    } catch (e) {}
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.style.color = 'rgba(255,255,255,0.7)';
      empty.textContent = 'No debates recorded yet.';
      list.appendChild(empty);
      return;
    }
    entries.slice().reverse().forEach(entry => {
      const item = document.createElement('div');
      item.className = 'save-slot';
      item.innerHTML = `
        <div class="save-slot-title">Hymn ${entry.hymnId} — ${entry.choice}</div>
        <div class="save-slot-info">${new Date(entry.time).toLocaleString()}<br>${entry.line || ''}</div>
      `;
      list.appendChild(item);
    });
  }

  // Event listeners
  document.getElementById('applySettingsBtn').addEventListener('click', () => {
    if (window.state && window.state.settings) {
      window.state.settings.textSpeed = parseInt(document.getElementById('textSpeedSlider').value);
      window.state.settings.autoPlaySpeed = parseInt(document.getElementById('autoPlaySlider').value);
      window.state.settings.bgmVolume = parseInt(document.getElementById('bgmVolumeSlider').value);
      window.state.settings.sfxVolume = parseInt(document.getElementById('sfxVolumeSlider').value);
      window.state.settings.voiceVolume = parseInt(document.getElementById('voiceVolumeSlider').value);
      window.state.settings.autoAdvance = document.getElementById('autoAdvanceToggle').checked;
      window.state.settings.skipUnread = document.getElementById('skipUnreadToggle').checked;
      
      if (window.saveAuto) {
        window.saveAuto();
      }
      if (window.audio && window.audio.setVolumes) {
        window.audio.setVolumes();
      }
      
      alert('Settings applied successfully!');
    }
  });
  
  document.getElementById('backFromSettingsBtn').addEventListener('click', showMainPanel);
  document.getElementById('backFromSaveLoadBtn').addEventListener('click', showMainPanel);
  document.getElementById('backFromGalleryBtn').addEventListener('click', showMainPanel);
  document.getElementById('backFromAchievementsBtn').addEventListener('click', showMainPanel);
  const backFromDebateLogBtn = document.getElementById('backFromDebateLogBtn');
  if (backFromDebateLogBtn) backFromDebateLogBtn.addEventListener('click', showMainPanel);
  
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (overlay.style.display === 'flex') {
        if (currentPanel === 'main') {
          window.hideVNOverlay();
        } else {
          showMainPanel();
        }
      } else {
        window.showVNOverlay();
      }
    }
  });
  
  // Close on outside click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (currentPanel === 'main') {
        window.hideVNOverlay();
      } else {
        showMainPanel();
      }
    }
  });
  
  // Expose functions for save/load slots
  window.doSaveToSlot = function(slot) {
    try {
      if (window.state) {
        window.state.timestamp = Date.now();
        localStorage.setItem(`rta_save_slot_${slot}`, JSON.stringify(window.state));
        alert(`Game saved to slot ${slot}!`);
        window.hideVNOverlay();
      }
    } catch (e) {
      alert('Save failed!');
    }
  };
  
  window.doLoadFromSlot = function(slot) {
    try {
      const saveData = localStorage.getItem(`rta_save_slot_${slot}`);
      if (saveData) {
        const parsed = JSON.parse(saveData);
        Object.assign(window.state, parsed);
        
        if (window.updateHUD) window.updateHUD();
        if (window.updateHymnInfo) window.updateHymnInfo();
        if (window.updateCodexPanel) window.updateCodexPanel();
        
        if (window.state.currentScene && window.enterScene) {
          window.enterScene(window.state.currentScene);
        }
        
        alert(`Game loaded from slot ${slot}!`);
        window.hideVNOverlay();
      } else {
        alert('No save data found in this slot!');
      }
    } catch (e) {
      alert('Load failed!');
    }
  };
})();
