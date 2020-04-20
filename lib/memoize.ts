function isPrimitive(value) {
	return (
		(typeof value !== "object" && typeof value !== "function") || value === null
	);
}

function MapTree() {
	this.childBranches = new WeakMap();
	this.primitiveKeys = new Map();
	this.hasValue = false;
	this.value = undefined;
}

MapTree.prototype.has = function has(key) {
	const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
	return keyObject ? this.childBranches.has(keyObject) : false;
};

MapTree.prototype.get = function get(key) {
	const keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
	return keyObject ? this.childBranches.get(keyObject) : undefined;
};

MapTree.prototype.resolveBranch = function resolveBranch(key) {
	if (this.has(key)) {
		return this.get(key);
	}
	const newBranch = new MapTree();
	const keyObject = this.createKey(key);
	this.childBranches.set(keyObject, newBranch);
	return newBranch;
};

MapTree.prototype.setValue = function setValue(value) {
	this.hasValue = true;
	return (this.value = value);
};

MapTree.prototype.createKey = function createKey(key) {
	if (isPrimitive(key)) {
		const keyObject = {};
		this.primitiveKeys.set(key, keyObject);
		return keyObject;
	}
	return key;
};

/* eslint-disable prefer-rest-params, prefer-spread */
MapTree.prototype.clear = function clear() {
	if (arguments.length === 0) {
		this.childBranches = new WeakMap();
		this.primitiveKeys.clear();
		this.hasValue = false;
		this.value = undefined;
	} else if (arguments.length === 1) {
		const key = arguments[0];
		if (isPrimitive(key)) {
			const keyObject = this.primitiveKeys.get(key);
			if (keyObject) {
				this.childBranches.delete(keyObject);
				this.primitiveKeys.delete(key);
			}
		} else {
			this.childBranches.delete(key);
		}
	} else {
		const childKey = arguments[0];
		if (this.has(childKey)) {
			const childBranch = this.get(childKey);
			childBranch.clear.apply(
				childBranch,
				Array.prototype.slice.call(arguments, 1),
			);
		}
	}
};

export default function memoize(fn: Function) {
	const argsTree = new MapTree();

	function memoized() {
		const args = Array.prototype.slice.call(arguments);
		const argNode = args.reduce(function getBranch(parentBranch, arg) {
			return parentBranch.resolveBranch(arg);
		}, argsTree);
		if (argNode.hasValue) {
			return argNode.value;
		}
		const value = fn.apply(null, args);
		return argNode.setValue(value);
	}

	memoized.clear = argsTree.clear.bind(argsTree);

	return memoized;
}
