!function(t, e) {
	function n(t, n) {
		var r, a = t, i = !1, o = null;
		try {
			r = n === sessionStorage ? sessionStorage : localStorage
		} catch (t) {
			r = n
		}
		function f(t) {
			!function(t, e) {
				try {
					r.setItem(t, e)
				} catch (t) {
					return !1
				}
			}(a, t)
		}
		function diu() {
			return this.t
		}
		function u(t) {
			return !!o.tables[t]
		}
		function l(t) {
			u(t) || m("The table '" + t + "' does not exist")
		}
		function s(t, e, n) {
			if (o.tables[t].fields = o.tables[t].fields.concat(e),
			void 0 !== n)
				for (var r in o.data[t])
					if (o.data[t].hasOwnProperty(r))
						for (var a in e)
							o.data[t][r][e[a]] = "object" == typeof n ? n[e[a]] : n
		}
		function c(t, e) {
			return e.ID = o.tables[t].auto_increment,
			o.data[t][o.tables[t].auto_increment] = e,
			o.tables[t].auto_increment++,
			e.ID
		}
		function d(t, e) {
			return function(n, r) {
				var a = "string" == typeof n[t] ? n[t].toLowerCase() : n[t]
				  , i = "string" == typeof r[t] ? r[t].toLowerCase() : r[t];
				return "DESC" === e ? a === i ? 0 : a < i ? 1 : -1 : a === i ? 0 : a > i ? 1 : -1
			}
		}
		function h(t, e) {
			var n = []
			  , r = !1
			  , a = null;
			for (var i in o.data[t])
				if (o.data[t].hasOwnProperty(i)) {
					for (var f in a = o.data[t][i],
					r = !0,
					e)
						if (e.hasOwnProperty(f))
							if ("string" == typeof e[f]) {
								if (null === a[f] || a[f].toString().toLowerCase() !== e[f].toString().toLowerCase()) {
									r = !1;
									break
								}
							} else if (a[f] !== e[f]) {
								r = !1;
								break
							}
					r && n.push(i)
				}
			return n
		}
		function p(t, e) {
			var n = [];
			for (var r in o.data[t])
				o.data[t].hasOwnProperty(r) && !0 === e(g(o.data[t][r])) && n.push(r);
			return n
		}
		function v(t) {
			var e = [];
			for (var n in o.data[t])
				o.data[t].hasOwnProperty(n) && e.push(n);
			return e
		}
		function y(t, e, n) {
			for (var r = "", a = 0, i = 0; i < e.length; i++) {
				r = e[i];
				var f = n(g(o.data[t][r]));
				if (f) {
					/*delete f.ID;*/
					var u = o.data[t][r];
					for (var l in f)
						f.hasOwnProperty(l) && (u[l] = f[l]);
					o.data[t][r] = O(t, u),
					a++
				}
			}
			return a
		}
		function b() {
			try {
				return r.setItem(a, JSON.stringify(o)),
				!0
			} catch (t) {
				return !1
			}
		}
		function m(t) {
			throw new Error(t)
		}
		function g(t) {
			var e = {};
			for (var n in t)
				t.hasOwnProperty(n) && (e[n] = t[n]);
			return e
		}
		function w(t) {
			return !t.toString().match(/[^a-z_\.\s0-9]/gi)
		}
		function O(t, e) {
			var n = ""
			  , r = {};
			for (n in e) {
				-1 === o.tables[t].fields.indexOf(n) && m("Invalid query parameter: " + n),
				r[n] = e[n]
			}
			return r
		}
		function P(t, n) {
			for (var r = "", a = {}, i = 0; i < o.tables[t].fields.length; i++)
				a[r = o.tables[t].fields[i]] = null === n[r] || n[r] === e ? null : n[r];
			return a
		}
		return (o = r[a]) && (o = JSON.parse(o)) && o.tables && o.data || (w(t) ? (o = {
			tables: {},
			data: {}
		},
		b(),
		i = !0) : m("The name '" + t + "' contains invalid characters")),
		{
			commit: function() {
				return b()
			},
			isNew: function() {
				return i
			},
			drop: function() {
				r.hasOwnProperty(a) && delete r[a],
				o = null
			},
			getItem: function(t) {
				return function(t) {
					try {
						return r.storage[t]
					} catch (t) {
						return null
					}
				}(t)
			},
			replace: function(t) {
				f(t)
			},
			serialize: function() {
				return JSON.stringify(o)
			},
			tableExists: function(t) {
				return u(t)
			},
			tableFields: function(t) {
				return function(t) {
					return o.tables[t].fields
				}(t)
			},
			tableCount: function() {
				return function() {
					var t = 0;
					for (var e in o.tables)
						o.tables.hasOwnProperty(e) && t++;
					return t
				}()
			},
			columnExists: function(t, e) {
				return function(t, e) {
					var n = !1
					  , r = o.tables[t].fields;
					for (var a in r)
						if (r[a] === e) {
							n = !0;
							break
						}
					return n
				}(t, e)
			},
			createTable: function(t, e) {
				var n = !1;
				if (w(t))
					if (this.tableExists(t))
						m("The table name '" + t + "' already exists.");
					else {
						var r, a = !0;
						for (r = 0; r < e.length; r++)
							if (!w(e[r])) {
								a = !1;
								break
							}
						if (a) {
							var i = {};
							for (r = 0; r < e.length; r++)
								i[e[r]] = !0;
							for (var f in delete i.ID,
							e = ["ID"],
							i)
								i.hasOwnProperty(f) && e.push(f);
							!function(t, e) {
								o.tables[t] = {
									fields: e,
									auto_increment: 1
								},
								o.data[t] = {}
							}(t, e),
							n = !0
						} else
							m("One or more field names in the table definition contains invalid characters")
					}
				else
					m("The database name '" + t + "' contains invalid characters.");
				return n
			},
			createTableWithData: function(t, e) {
				("object" != typeof e || !e.length || e.length < 1) && m("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");
				var n = Object.keys(e[0]);
				if (this.createTable(t, n)) {
					this.commit();
					for (var r = 0; r < e.length; r++)
						c(t, e[r]) || m("Failed to insert record: [" + JSON.stringify(e[r]) + "]");
					this.commit()
				}
				return !0
			},
			dropTable: function(t) {
				l(t),
				function(t) {
					delete o.tables[t],
					delete o.data[t]
				}(t)
			},
			truncate: function(t) {
				l(t),
				function(t) {
					o.tables[t].auto_increment = 1,
					o.data[t] = {}
				}(t)
			},
			alterTable: function(t, e, n) {
				var r = !1;
				if (w(t)) {
					if ("object" == typeof e) {
						var a, i = !0;
						for (a = 0; a < e.length; a++)
							if (!w(e[a])) {
								i = !1;
								break
							}
						if (i) {
							var o = {};
							for (a = 0; a < e.length; a++)
								o[e[a]] = !0;
							for (var f in delete o.ID,
							e = [],
							o)
								o.hasOwnProperty(f) && e.push(f);
							s(t, e, n),
							r = !0
						} else
							m("One or more field names in the table definition contains invalid characters")
					} else if ("string" == typeof e)
						if (w(e)) {
							var u = [];
							u.push(e),
							s(t, u, n),
							r = !0
						} else
							m("One or more field names in the table definition contains invalid characters")
				} else
					m("The database name '" + t + "' contains invalid characters");
				return r
			},
			rowCount: function(t) {
				return l(t),
				function(t) {
					var e = 0;
					for (var n in o.data[t])
						o.data[t].hasOwnProperty(n) && e++;
					return e
				}(t)
			},
			insert: function(t, e) {
				return l(t),
				c(t, P(t, e))
			},
			insertOrUpdate: function(t, e, n) {
				l(t);
				var r = [];
				if (e ? "object" == typeof e ? r = h(t, O(t, e)) : "function" == typeof e && (r = p(t, e)) : r = v(t),
				0 === r.length)
					return c(t, P(t, n));
				var a = [];
				return y(t, r, function(t) {
					return a.push(t.ID),
					n
				}),
				a
			},
			update: function(t, e, n) {
				l(t);
				var r = [];
				return e ? "object" == typeof e ? r = h(t, O(t, e)) : "function" == typeof e && (r = p(t, e)) : r = v(t),
				y(t, r, n)
			},
			query: function(t, n, r, a, i, f) {
				l(t);
				var u = [];
				return n ? "object" == typeof n ? u = h(t, O(t, n)) : "function" == typeof n && (u = p(t, n)) : u = v(t),
				function(t, n, r, a, i, f) {
					var u, l = null, s = [], c = null;
					for (u = 0; u < n.length; u++)
						l = n[u],
						c = o.data[t][l],
						s.push(g(c));
					if (i && i instanceof Array)
						for (u = 0; u < i.length; u++)
							s.sort(d(i[u][0], i[u].length > 1 ? i[u][1] : null));
					if (f && f instanceof Array) {
						for (var h = 0; h < f.length; h++) {
							var p = {}
							  , v = f[h];
							for (u = 0; u < s.length; u++)
								s[u] !== e && (s[u].hasOwnProperty(v) && p.hasOwnProperty(s[u][v]) ? delete s[u] : p[s[u][v]] = 1)
						}
						var y = [];
						for (u = 0; u < s.length; u++)
							s[u] !== e && y.push(s[u]);
						s = y
					}
					return a = a && "number" == typeof a ? a : null,
					(r = r && "number" == typeof r ? r : null) && a ? s = s.slice(r, r + a) : r ? s = s.slice(r) : a && (s = s.slice(r, a)),
					s
				}(t, u, a, r, i, f)
			},
			queryAll: function(t, e) {
				return e ? this.query(t, e.hasOwnProperty("query") ? e.query : null, e.hasOwnProperty("limit") ? e.limit : null, e.hasOwnProperty("start") ? e.start : null, e.hasOwnProperty("sort") ? e.sort : null, e.hasOwnProperty("distinct") ? e.distinct : null) : this.query(t)
			},
			dbInUse: function() {
				return t;
			},
			deleteRows: function(t, e) {
				l(t);
				var n = [];
				return e ? "object" == typeof e ? n = h(t, O(t, e)) : "function" == typeof e && (n = p(t, e)) : n = v(t),
				function(t, e) {
					for (var n = 0; n < e.length; n++)
						o.data[t].hasOwnProperty(e[n]) && delete o.data[t][e[n]];
					return e.length
				}(t, n)
			}
		}
	}
	"undefined" != typeof module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? define(function() {
		return n
	}) : t.localStorageDB = n
}("undefined" != typeof window ? window : this);
Di = {
	DBName: "DinomDB"
};
Di = {
	Pref: new Object(),
	DBName: Di.DBName,
	isDomain: function(str) {
		return (/^(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}$/i.test(str));
	},
	isJSON: function(str) {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	},
	TimeNow: function() {
		return Math.round((new Date()).getTime() / 1000);
	},
	unsetFromArray: function(el, array) {
		return array.filter(e=>e !== el);
	},

	SetDefaults: function(optionsToCheck, defaultValues) {
		r = {};
		optionsToCheck = (optionsToCheck ? optionsToCheck : {});
		for (op in defaultValues) {
			r[op] = (typeof (optionsToCheck[op]) !== 'undefined' ? optionsToCheck[op] : defaultValues[op]);
		}
		return r;
	},

	err: function(message) {
		if (Di.Pref.DevDebug || typeof (Di.Pref.DevDebug) == "undefined") {
			console.log(message);
		}
		return 'jsErr';
	},

	Setup: function(d) {
		for (var setting in d) {
			Di.Pref[setting] = d[setting];
		}
		;
	},

	Set: function(key, value) {
		value = (typeof (value) == 'object' ? JSON.stringify(value) : value);
		return localStorage.setItem(key, value);
	},
	Get: function(key) {
		var i = localStorage.getItem(key);
		return (Di.isJSON(i) ? JSON.parse(i) : i);
	},
	Del: function(key) {
		return localStorage.removeItem(key);
	},

	Cookie: {
		// Requires:
		// 	- name
		// 	- value
		// 	- days [number of days the cookie should remain in the browser]
		Set: function(name, value, days) {
			var expires = '';
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = '; expires=' + date.toUTCString();
			}
			document.cookie = name + '=' + (value || '') + expires + '; path=/;SameSite=Lax';
		},
		Get: function(name) {
			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		},
		Delete: function(name) {
			document.cookie = name + '=; Max-Age=-99999999; path=/';
		}
	},

	DB: {
		LS: new localStorageDB(Di.DBName),
		RenameDB: function(source, target) {
			try {
				if (localStorage.getItem(source) !== null && localStorage.getItem(target) == null && source !== target) {
					localStorage.setItem(target, localStorage.getItem(source));
					localStorage.removeItem(source);
					return true;
				}
				return false;
			} catch (e) {
				return false;
			}
		},
		Annihilate: function(db, force) {
			if (force) {
				localStorage.removeItem(db);
			} else {
				if (confirm('Are you sure you want to destroy database ' + db + '?')) {
					localStorage.removeItem(db);
				}
			}
		},
		CreateTable: function(tableName, columns, save) {
			this.LS.createTable(tableName, columns);
			if (save) {
				this.LS.commit();
			}
		},
		PopulateNewTable: function(tableName, rows, save) {
			this.LS.createTableWithData(tableName, rows);
			if (save) {
				this.LS.commit();
			}
		},
		Get: function(table, query, column, sort, limit) {
			if (typeof (query) !== 'function') {
				for (k in query) {
					if (typeof (query[k]) == 'object') {
						var modQuery = function(entry) {
							if (query[k].includes(entry[Object.keys(query)[0]])) {
								return true;
							}
						}
					}
				}
			}

			var d = this.LS.queryAll(table, {
				query: (modQuery ? modQuery : query),
				'sort': sort,
				'limit': limit
			});
			if (!d || !d.length) {
				return [];
			}
			if (typeof column == "undefined" || column == false) {
				return d;
			} else {
				var returnObject = new Array();
				if (d.length > 1) {
					for (entry in d) {
						if (typeof (column) == 'object') {
							var tempO = new Object();
							for (col in column) {
								tempO[column[col]] = d[entry][column[col]];
							}
							returnObject.push(tempO);
						} else {
							returnObject.push(d[entry][column]);
						}
					}
				} else {
					if (typeof (column) == 'object') {

						var tempO = new Object();
						for (col in column) {
							tempO[column[col]] = d[0][column[col]];
						}
						returnObject.push(tempO);

						// for(col in column){
						// 	returnObject.push()
						// 	returnObject[column[col]]=d[0][column[col]];
						// }
					} else {
						returnObject = d[0][column];
					}
				}
				return returnObject;
			}
		},
		Insert: function(table, entry, callBack, multi) {
			this.LS.insert(table, entry);
			if (!multi) {
				this.LS.commit();
			}
			if (callBack) {
				return JSON.parse(localStorage.getItem(Di.DB.LS.dbInUse()))['tables'][table]['auto_increment'] - 1;
			}
		},
		Update: function(table, selector, changeThis) {
			this.LS.update(table, selector, function(r) {
				for (var u in changeThis) {
					r[u] = changeThis[u];
				}
				return r;
			});
			this.LS.commit();
		},
		InsertORUpdate: function(table, selector, entry) {
			this.LS.insertOrUpdate(table, selector, entry);
			this.LS.commit();
		},
		Extract: function(table, query, column, sort, limit) {
			var r = this.Get(table, query, column, sort, limit);
			if (Array.isArray(r)) {
				var toDel = [];
				r.forEach(function(val, index) {
					toDel.push(val.ID);
				});
				this.Delete(table, {
					'ID': toDel
				});
			} else {
				this.Delete(table, r);
			}

			return r;
		},
		Delete: function(table, rows) {
			if (typeof (rows[Object.keys(rows)]) == 'object') {
				for (k in rows[Object.keys(rows)[0]]) {
					var q = Object();
					q[Object.keys(rows)[0]] = rows[Object.keys(rows)[0]][k];
					this.LS.deleteRows(table, q);
				}
			} else {
				this.LS.deleteRows(table, rows);
			}
			this.LS.commit();
		},
		Setup: function(a) {
			for (var table in a) {
				this.LS.createTable(table, a[table]['header']);
				if (typeof a[table]['data'] !== "undefined") {
					for (var entry in a[table]['data']) {
						this.LS.insert(table, a[table]['data'][entry]);
					}
				}
			}
			this.LS.commit();
		},
		Save: function() {
			this.LS.commit();
		},
		IsSet: function() {
			return (this.LS.isNew() ? false : true);
		},
		TableCount: function() {
			return this.LS.tableCount();
		},
		Dump: function() {
			return this.LS.serialize();
		},
		IsTable: function(table) {
			return this.LS.tableExists(table);
		},
		GetHeaders: function(table) {
			return this.LS.tableFields(table);
		},
		ChangeHeaders: function(table, headers, defaultValue) {
			this.LS.alterTable(table, headers, defaultValue);
		},
		CheckHeader: function(table, header) {
			return this.LS.columnExists(table, header);
		},
		Drop: function(table) {
			this.LS.dropTable(table);
			this.LS.commit();
		},
		Empty: function(table) {
			this.LS.truncate(table);
			this.LS.commit();
		},
		EntryCount: function(table) {
			return this.LS.rowCount(table);
		},
		Export: function() {
			return localStorage.getItem(Di.DBName);
		},
		GetDBSize: function(db, logOutput) {
			var data = '';
			var r = {};
			var o = "Database(s):\n";
			if (db) {
				if (window.localStorage.hasOwnProperty(db)) {
					data = window.localStorage[db];
					size = ((window.localStorage[db].length * 16) / (8 * 1024)).toFixed(2);
					o += ("\t" + db + " = " + size + " KB\n");
					r[db] = parseFloat(size);
				}
			} else {
				for (var key in window.localStorage) {
					if (window.localStorage.hasOwnProperty(key)) {
						data += window.localStorage[key];
						size = ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2);
						o += ("\t" + key + " = " + size + " KB\n");
						r[key] = parseFloat(size);
					}
				}
			}
			var total = parseFloat(data ? ((data.length * 16) / (8 * 1024)).toFixed(2) : 0);
			var remaining = parseFloat(data ? (2048 - ((data.length * 16) / (8 * 1024)).toFixed(2)) : '2048');
			o += (data ? '\n' + 'Total usage= ' + total + ' KB' : 'None (0 KB)') + "\n" + (data ? 'Space remaining= ~' + remaining + ' KB' : '2 MB');
			r['total'] = total;
			r['remaining'] = remaining;
			if (logOutput) {
				console.log(o);
			}
			return r;
		}
	},

	WS: {
		ReconnectInterval: 0,
		ReconnectAttempts: 0,
		Mon: new Object(),
		// Used to store the Interval IDs for the monitored requests

		Connect: function(server) {
			if (Di.DB.IsTable('DinomQ')) {
				Di.DB.Empty('DinomQ');
			} else {
				Di.DB.CreateTable('DinomQ', ['request', 'sentAt', 'onSuccess', 'onError', 'onTimeout'], true);
			}

			Di.WS.Server = server;
			Di.Stream = new WebSocket('wss://' + server + '/');
			Di.Stream.onopen = function(e) {
				if (Di.WS.ReconnectInterval !== 0) {
					clearInterval(Di.WS.ReconnectInterval);
					Di.WS.ReconnectInterval = 0;
					Di.WS.ReconnectAttempts = 0;
				}
				let DinomCookies = document.cookie.split("; ").reduce(function(dc, str, index) {
					var c = str.split(/\s*(?:=)(.*)/gm);
					if (c[0].startsWith('Dinom_')) {
						dc[c[0].replace(/\s+/g, '')] = c[1].trim();
					}
					return dc;
				}, {});

				// Send the Handshake request only if there are Dinom cookies to validate
				if (Object.keys(DinomCookies).length) {
					Di.Stream.send(JSON.stringify({
						'Command': 'Handshake',
						'Data': DinomCookies,
						'QID': '-'
					}));
				}
			}
			Di.Stream.onerror = function(e) {
				if (Di.WS.ReconnectInterval == 0) {
					Di.WS.Reconnect(server);
				}
				if (typeof (window[Di.Pref.OnWSError]) == 'function') {
					window[Di.Pref.OnWSError]();
				}
			}
			Di.Stream.onclose = function(e) {
				if (!Di.Pref.WSRejected) {
					if (Di.WS.ReconnectInterval == 0) {
						Di.WS.Reconnect(server);
					}
					if (typeof (window[Di.Pref.OnWSClose]) == 'function') {
						window[Di.Pref.OnWSClose](e);
					}
				}
			}
			Di.Stream.onmessage = function(e) {
				try {
					Di.WS.Q.In(JSON.parse(e.data));
				} catch (err) {
					l = {
						'error': 'Received response from Dinom in inappropriate format.',
						'response': e.data,
						'catch': err
					};
					if (typeof (window[Di.Pref.OnWSError]) == 'function') {
						window[Di.Pref.OnWSError](l);
					} else {
						Di.err(l);
					}
				}
			}
		},

		Reconnect: function(server) {
			Di.WS.ReconnectInterval = setInterval(function() {
				Di.WS.ReconnectAttempts++;
				Di.err('Attempting to reconnect to ' + server + '. Attempt N' + Di.WS.ReconnectAttempts);
				if (Di.WS.ReconnectAttempts == Di.Pref.WSMaxReconnectAttempts) {
					window[Di.Pref.WSServerUnreachable]();
				} else {
					Di.WS.Connect(server);
				}
			}, (Di.Pref.WSReconnectInterval ? (Di.Pref.WSReconnectInterval * 1000) : 2000));
		},

		checkConnection: function() {
			return (Di.Stream.readyState == Di.Stream.OPEN ? true : false);
		},

		Q: {
			In: function(r) {
				if (r && r.status) {
					// WebSocket connection was rejected by the WS node
					if (r.status == 1403) {
						Di.err(r.data);
						Di.Pref.WSRejected = true;
					}

					// WS connection has been established and the WS node responded with the initial message
					if (r.status == 'init' && typeof (r.data) == 'object') {
						Di.Setup(r.data);
						return;
					}

					// WS indicates a Cookie has to be set in the browser
					if (r.status == 'setCookie' && typeof (r.data) == 'object') {
						for (cookie in r.data) {
							Di.Cookie.Set(cookie, r.data[cookie], Di.Pref.CookieExpiration);
						}
					}

					// The WS node indicated Dinom_ Cookie is invalid and it should be unset
					if (r.status == 76235399883) {
						// There are cookies to be unset, and the user logged out
						if (typeof (r.data) == 'object') {
							let logout = false;
							r.data.forEach(function(v, k) {
								Di.Cookie.Delete(v);
								// The AuthCookie is invalid - Logout the user
								if (v == 'Dinom_UID') {
									logout = true;
								}
							});

							if (logout) {
								Di.User.Logout();
							}
							return;
						}

						// When the UserAuth doesn't matter, the setup should still continue
						Di.Setup();
					}

					// WS responds with status indicating the user's IP has been banned, no need to attempt reconnecting
					if (r.status == 450) {
						Di.Pref.WSRejected = true;
						Di.err(r.message);
						alert(r.message);
					}
				}

				// All other requests with a referrence to a QID
				if (r.QID && r.QID !== '-') {
					clearInterval(Di.WS.Mon[r.QID]);
					dbr = Di.DB.Extract('DinomQ', {
						'ID': r.QID
					}, false, [['ID', 'ASC']])[0];
					if (dbr) {
						if (r.status == 200) {
							if (typeof (window[dbr.onSuccess]) == 'function') {
								window[dbr.onSuccess](r);
							} else {
								Di.err("--------------Error--------------\nA request is set to trigger an undefined function for onSuccess.\n\nRequest: " + dbr.request + "\nSent at: " + dbr.sentAt + "\nonSuccess: " + dbr.onSuccess + "\nonError: " + dbr.onError + "\nonTimeout: " + dbr.onTimeout + '---------------------------------');
							}
						} else {
							if (dbr.onError !== '') {
								if (typeof (window[dbr.onError]) == 'function') {
									window[dbr.onError](r);
								} else {
									Di.err("--------------Error--------------\nA request is set to trigger an undefined function for onError.\n\nRequest: " + dbr.request + "\nSent at: " + dbr.sentAt + "\nonSuccess: " + dbr.onSuccess + "\nonError: " + dbr.onError + "\nonTimeout: " + dbr.onTimeout + '---------------------------------');
								}
							} else {
								if (typeof (window[Di.Pref.OnWSGlobalResponseErrorHandler]) == 'function') {
									window[Di.Pref.OnWSGlobalResponseErrorHandler](r.data);
								}
							}
						}
					} else {
						Di.err("--------------Warning--------------\nMessage received for QID that doesn't exist.\n\nStatus: " + r.status + "\nQID: " + r.QID + "\nReceived at: " + Di.TimeNow() + "\nData: " + JSON.stringify(r.data) + "\n-----------------------------------");
					}
				}
			},
			Out: function(opt) {
				if (!opt || !opt.request || !opt.data || !opt.onSuccess) {
					if (!opt.onComplete) {
						return Di.err('Di.WS.Q.Out was called with missing required options: request,data,onSuccess');
					}
				}
				try {
					opt = Di.SetDefaults(opt, {
						'request': '',
						'data': '',
						'onComplete': '',
						'onSuccess': '',
						'onError': '',
						'onTimeout': ''
					});
					if (opt.onComplete) {
						opt.onSuccess = opt.onComplete;
						opt.onError = opt.onComplete;
						opt.onTimeout = opt.onComplete;
					}
					wsRequest = new Object();
					wsRequest.Command = opt.request;
					wsRequest.Data = opt.data;
					wsRequest.sentAt = Di.TimeNow();
					wsRequest.QID = Di.DB.Insert('DinomQ', {
						'request': wsRequest.Command,
						'sentAt': wsRequest.sentAt,
						'onSuccess': opt['onSuccess'],
						'onError': opt['onError'],
						'onTimeout': opt['onTimeout']
					}, true);
					Di.Stream.send(JSON.stringify(wsRequest));
					Di.WS.Q.Monitor(wsRequest);
					return wsRequest.QID;
				} catch (e) {
					return Di.err('There was a problem sending out the request through the WebSocket stream:\n' + e);
				}
			},
			Monitor: function(d) {
				Di.WS.Mon[d.QID] = setInterval(function() {
					if (Di.TimeNow() > (parseInt(d.sentAt) + parseInt(Di.Pref.WSMaxRequestWaitTime))) {
						dbr = Di.DB.Extract('DinomQ', {
							'ID': d.QID
						}, false, [['ID', 'ASC']])[0];
						if (dbr.onTimeout !== '') {
							if (typeof (window[dbr.onTimeout]) == 'function') {
								window[dbr.onTimeout]();
							} else {
								Di.err("--------------Error--------------\nA request is set to trigger an undefined function for onTimeout.\n\nRequest: " + dbr.request + "\nSent at: " + dbr.sentAt + "\nonSuccess: " + dbr.onSuccess + "\nonError: " + dbr.onError + "\nonTimeout: " + dbr.onTimeout + "\n---------------------------------");
								if (Di.Pref.OnWSRequestTimeout !== '' && typeof (window[Di.Pref.OnWSRequestTimeout]) == 'function') {
									window[Di.Pref.OnWSRequestTimeout]({
										'id': d.QID,
										'request': d.Command
									});
								}
							}
						} else {
							if (Di.Pref.OnWSRequestTimeout !== '' && typeof (window[Di.Pref.OnWSRequestTimeout]) == 'function') {
								window[Di.Pref.OnWSRequestTimeout]({
									'id': d.QID,
									'request': d.Command
								});
							}
						}
						clearInterval(Di.WS.Mon[d.QID]);
					}
				}, 200);
			}
		}
	},

	User: {
		Auth: function(IDf, AUf, onComplete) {
			// Expected auth response:
			//  - 200 for valid authentication, along with the User Cookie - Dinom_UID
			//  - 401 for invalid credentials
			//  - 429 for TOO MANY authorization requests
			Di.WS.Q.Out({
				'request': 'UserAuth',
				'data': {
					'IDf': IDf,
					'AUf': AUf
				},
				'onComplete': onComplete
			});
		},
		Logout: function() {
			location.reload();
		},
		Make: function(id, params) {// TODO
		// Create a functionality for the developers to create website users by replicating the UserScope for each of their users
		}
	},

	$: {
		Pub: {
			// Fetch records from a public table
			// Requires:
			// 	- opt.table / table name as `opt`
			// 	- on.complete/success
			// Optional:
			// 	- opt.filter 	{object with properties to filter results based on expected content. Each additional property is considered as "OR".}
			// 					{Currently supports only "short"}
			// 	- opt.fields 	[array of field names to be returned]
			// 	- opt.limit		[integer, limiting the number of returned items]
			// 	- opt.page 		[integer, requesting certain page number] [requires opt.perPage to be set]
			// 		- opt.perPage	[integer, the delimiter number, segregating the list of items into pages. Used together with opt.page]

			// TODO
			// 	- opt.sort		{object, specifying the field name and sort type (ASC/DESC) }

			// 	- on.success 	(function to be called if the status of the request is 200)
			// 	- on.error 		(function to be called if the status is NOT 200)
			// 	- on.timeout 	(function to be called if the request times out)
			Get: function(opt, on) {
				if (typeof (opt) == 'object') {
					if (!opt.table) {
						return Di.err('Di.$.Pub.Get was called without specifying the "table".');
					}
				}

				let req = {
					request: 'getPubData',
					data: opt
				};

				if (typeof (on) == 'object') {
					if (on.success) {
						req.onSuccess = on.success;
					}
					if (on.error) {
						req.onError = on.error;
					}
					if (on.complete) {
						req.onComplete = on.complete;
					}
					if (on.timeout) {
						req.onTimeout = on.timeout;
					}
				} else {
					req.onComplete = on;
				}

				Di.WS.Q.Out(req);
				return true;
			}
			// TODO
			// Add functionality for developers to FETCH ONLY information from their Public Scope
			// If the data is found returns status '200' with the data
			// OR returns status '404' for 'Not Found'
			//
			// Get {record}
			// GetList (columns) [ListOfColumns]
			// GetPage (pageNum,perPage,Columns) [ListOfEntries]
		},

		// Write data to SecureScope table
		// Requires:
		// 	opt.table 		str	- name of the table to be written into
		// 	opt.fields 		obj	- object containing the name of the field(s) and the corresponding value
		// 	on.Complete/Success fn - function name to be triggered for onComplete|onSuccess event
		//
		// TODO
		// Optional:
		// 	opt.update 		obj - if the write should be UPDATE instead of INSERT, this object specifies the filtering column and the corresponding value (column == value) for the update
		//
		// Returns:
		// 	200 - If the request successfully went into the Blackhole
		// 	406 - Request didn't manage to get into the Blackhole
		Sec: function(opt, on) {
			if (typeof (opt) !== 'object' || !opt.table || !opt.fields || !on) {
				return Di.err('Di.$.Sec was called with missing mandatory data. Ensure you are setting "table","fields", and "on.Complete" OR "on.Success".');
			}

			let req = {
				request: 'SecScope_Save',
				data: opt
			};
			if (typeof (on) == 'object') {
				if (on.success) {
					req.onSuccess = on.success;
				}
				if (on.error) {
					req.onError = on.error;
				}
				if (on.complete) {
					req.onComplete = on.complete;
				}
				if (on.timeout) {
					req.onTimeout = on.timeout;
				}
			} else {
				req.onComplete = on;
			}

			Di.WS.Q.Out(req);
			return true;
		},
		Usr: function(opt) {
			// Make sure the necessary options are defined
			if (!opt || !opt.table || !opt.fields || !opt.onSuccess) {
				Di.err('Di.Usr was called with missing required options: table,fields,onSuccess');
				return 'jsErr';
			}

			// Available 'type' options: r,read,g,get,sel,select || d,del,delete,rm || i,ins,insert,a,add,append || u,upd,update,ch,change,mod,modify,alt,alter
			opt = Di.SetDefaults(opt, {
				type: 'undefined',
				fields: false,
				table: false,
				where: false,
				limit: false,
				sort: 'asc',
				onSuccess: false,
				onError: false
			});

			// type determines the action to be taken - read/delete/insert/update
			var t;
			switch (opt.type) {
			case 'r':
			case 'read':
			case 'g':
			case 'get':
			case 'sel':
			case 'select':
				t = 'read';
				break;

			case 'd':
			case 'del':
			case 'delete':
			case 'rm':
				t = 'delete';
				break;

			case 'i':
			case 'ins':
			case 'insert':
			case 'a':
			case 'add':
			case 'append':
				t = 'insert';
				break;

			case 'u':
			case 'upd':
			case 'update':
			case 'ch':
			case 'change':
			case 'mod':
			case 'modify':
			case 'alt':
			case 'alter':
				t = 'update';
				break;

			default:
				t = false;
				break;
			}
			if (!t) {
				Di.err('Incorrect type: Di.$.Usr is not using a valid type: ' + type);
				return 'jsErr';
			}
		}
	}
}
