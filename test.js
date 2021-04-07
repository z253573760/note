class Dep {
	constructor() {
		this.subs = [];
	}
	notify() {
		this.subs.forEach((watcher) => watcher.update());
	}
	depend() {
		if (Dep.target) {
			dep.add(Dep.target);
		}
	}
	add(watcher) {
		this.subs.push(watcher);
	}
}
Dep.target = null;

class Observer {
	constructor(data) {
		this.obseve(data);
	}
	obseve(data) {
		Object.keys(data).forEach((key) => {
			const value = data[key];
			if (typeof value === "object") {
				this.obseve(value);
			} else {
				defineReactive(data, key);
			}
		});
	}
}

class Watcher {
	constructor(componentName) {
		this.componentName = componentName;
		Dep.target = this;
	}
	update() {
		console.log(
			`我是${this.componentName},我现在要去构建vnode 准备触发更新`
		);
	}
}

class Compier {
	constructor() {
		//
	}
}

function defineReactive(target, key) {
	const dep = new Dep();
	let value = target[key];
	Object.defineProperty(target, key, {
		get() {
			dep.depend();
			return value;
		},
		set(val) {
			dep.notify();
			value = val;
		},
	});
}

const obj = {
	a: "我是A",
	b: { c: "我是c" },
};

new Watcher("A组件");

new Observer(obj);
const s = obj.b.c;
console.log(s);
obj.b.c = "new 我是c";
