const customers = [
  {
    id: 'CUS-0001', company: '株式会社東日本設備', type: '法人（既存）', contact: '佐藤 恒一', phone: '03-6850-2140', email: 'sato@higashi-setsubi.co.jp', products: '業務用浄水器・交換フィルター', status: '取引中', statusClass: 'active',
    address: '〒101-0047 東京都千代田区内神田2-8-4', department: '設備営業部', notes: '定期的なフィルター交換のご案内を実施。次回の更新時期は2026年11月。',
    quotes: [{ no:'Q-2026-0418', date:'2026/09/03', product:'業務用浄水器 KS-500', qty:'2台', price:'¥185,000', total:'¥370,000', status:'提出済', statusClass:'sent' }, { no:'Q-2026-0291', date:'2026/06/18', product:'交換フィルター KF-500', qty:'12本', price:'¥8,400', total:'¥100,800', status:'受注', statusClass:'active' }],
    followUps: [{ date:'2026/09/05', method:'電話', owner:'田中 恒一', content:'浄水器2台の見積内容をご説明しました。', feedback:'社内で導入時期を確認中とのことです。', nextDate:'2026/09/19', action:'導入時期の確認電話' }, { date:'2026/08/21', method:'訪問', owner:'田中 恒一', content:'新製品の実機デモを実施しました。', feedback:'設置のしやすさを評価いただきました。', nextDate:'2026/09/05', action:'見積内容のご説明' }]
  },
  { id:'CUS-0002', company:'有限会社みなと食品', type:'法人（既存）', contact:'鈴木 美咲', phone:'045-621-8831', email:'m.suzuki@minato-foods.jp', products:'食品工場向け浄水設備', status:'取引中', statusClass:'active', address:'〒231-0801 神奈川県横浜市中区新山下1-12-9', department:'品質管理課', notes:'衛生管理の強化に合わせ、設備増設をご検討中です。', quotes:[{ no:'Q-2026-0386', date:'2026/08/12', product:'浄水ユニット KM-300', qty:'1式', price:'¥520,000', total:'¥520,000', status:'検討中', statusClass:'pending' }], followUps:[{ date:'2026/08/28', method:'メール', owner:'山本 彩', content:'増設設備の仕様資料を送付しました。', feedback:'設置スペースを確認後に連絡予定です。', nextDate:'2026/09/16', action:'設置スペースの確認' }] },
  { id:'CUS-0003', company:'北関東メンテナンス株式会社', type:'法人（見込）', contact:'高橋 恒一', phone:'028-612-4470', email:'takahashi@kitakanto-m.co.jp', products:'産業用フィルター', status:'商談中', statusClass:'pending', address:'〒320-0811 栃木県宇都宮市大通り3-2-5', department:'営業推進部', notes:'代理店としての取扱い可否を協議中。', quotes:[{ no:'Q-2026-0432', date:'2026/09/09', product:'産業用フィルター KIF-80', qty:'30本', price:'¥12,600', total:'¥378,000', status:'提出済', statusClass:'sent' }], followUps:[{ date:'2026/09/10', method:'オンライン会議', owner:'田中 恒一', content:'販売エリアと取扱条件について打合せしました。', feedback:'条件面を社内で検討するとの回答でした。', nextDate:'2026/09/24', action:'検討状況の確認' }] },
  { id:'CUS-0004', company:'社会福祉法人あおば会', type:'団体（既存）', contact:'中村 恒一', phone:'022-274-1862', email:'nakamura@aobakai.or.jp', products:'家庭用浄水器', status:'取引中', statusClass:'active', address:'〒981-0914 宮城県仙台市青葉区堤通雨宮町5-18', department:'総務課', notes:'施設内の給水設備を毎年点検しています。', quotes:[{ no:'Q-2026-0224', date:'2026/05/30', product:'家庭用浄水器 KH-100', qty:'8台', price:'¥36,000', total:'¥288,000', status:'受注', statusClass:'active' }], followUps:[{ date:'2026/08/04', method:'電話', owner:'山本 彩', content:'定期点検の日程を調整しました。', feedback:'9月第3週であれば対応可能とのことです。', nextDate:'2026/09/17', action:'定期点検の実施' }] },
  { id:'CUS-0005', company:'株式会社西東京商会', type:'法人（休眠）', contact:'伊藤 健', phone:'042-518-2098', email:'ito@nishi-tokyo-shokai.jp', products:'交換フィルター', status:'休眠', statusClass:'inactive', address:'〒190-0012 東京都立川市曙町1-26-8', department:'購買部', notes:'2025年度以降の受注実績なし。年1回の状況確認を予定。', quotes:[], followUps:[{ date:'2026/04/15', method:'メール', owner:'田中 恒一', content:'製品カタログと価格改定のお知らせを送付しました。', feedback:'返信なし。', nextDate:'2026/10/15', action:'電話での利用状況確認' }] }
];

const statusBadge = (label, statusClass) => `<span class="status status-${statusClass}">${label}</span>`;
const yen = value => value;
const profileLabels = [['会社名称','company'],['顧客タイプ','type'],['住所','address'],['部署','department'],['連絡担当者','contact'],['電話','phone'],['メール','email'],['主な製品','products'],['備考','notes']];
const customerBody = document.querySelector('#customer-table-body');
const listView = document.querySelector('#customer-list-view');
const detailView = document.querySelector('#customer-detail-view');

function renderCustomers(items) {
  customerBody.innerHTML = items.map(c => `<tr><td>${c.id}</td><td class="company-name">${c.company}</td><td>${c.type}</td><td>${c.contact}</td><td>${c.phone}</td><td>${c.email}</td><td>${c.products}</td><td>${statusBadge(c.status,c.statusClass)}</td><td><button class="table-link" type="button" data-customer-id="${c.id}">詳細</button></td></tr>`).join('');
  document.querySelector('#customer-count').textContent = `${items.length}件の顧客`;
  document.querySelector('#empty-state').hidden = items.length !== 0;
}

function showCustomer(customer) {
  document.querySelector('#detail-title').textContent = customer.company;
  document.querySelector('#detail-number').textContent = `顧客番号：${customer.id}`;
  document.querySelector('#detail-status').outerHTML = statusBadge(customer.status, customer.statusClass).replace('<span ', '<span id="detail-status" ');
  document.querySelector('#customer-profile').innerHTML = profileLabels.map(([label,key]) => `<div class="profile-item ${key === 'notes' ? 'wide' : ''}"><dt>${label}</dt><dd>${customer[key]}</dd></div>`).join('');
  document.querySelector('#quote-table-body').innerHTML = customer.quotes.length ? customer.quotes.map(q => `<tr><td>${q.no}</td><td>${q.date}</td><td>${q.product}</td><td>${q.qty}</td><td>${yen(q.price)}</td><td>${yen(q.total)}</td><td>${statusBadge(q.status,q.statusClass)}</td></tr>`).join('') : '<tr><td colspan="7">見積履歴はありません。</td></tr>';
  document.querySelector('#follow-up-list').innerHTML = customer.followUps.map(f => `<article class="follow-up"><div class="follow-up-top"><span class="follow-up-date">${f.date}</span><span class="contact-method">${f.method} ｜ 営業担当：${f.owner}</span></div><p><strong>連絡内容：</strong>${f.content}</p><p><strong>お客様の反応：</strong>${f.feedback}</p><div class="follow-up-meta"><span>次回連絡日：<b>${f.nextDate}</b></span><span>次のアクション：<b>${f.action}</b></span></div></article>`).join('');
  listView.hidden = true; detailView.hidden = false; window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelector('#customer-search').addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase();
  renderCustomers(customers.filter(c => [c.id,c.company,c.contact].join(' ').toLowerCase().includes(query)));
});
customerBody.addEventListener('click', event => { const button = event.target.closest('[data-customer-id]'); if (button) showCustomer(customers.find(c => c.id === button.dataset.customerId)); });
document.querySelector('#back-to-list').addEventListener('click', () => { detailView.hidden = true; listView.hidden = false; window.scrollTo({top:0, behavior:'smooth'}); });
document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); detailView.hidden = true; listView.hidden = false; });
renderCustomers(customers);
