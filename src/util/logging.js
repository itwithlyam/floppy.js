'use strict';

const Logger = require("discord-blackhole.logger");
const mkdirp = require("mkdirp-sync");
const fs = require("fs");

class Logging extends Logger.class
{
	constructor (path)
	{
		super();
		this.path = path;
		this.assureFile(this.path);
	}
	
	assureDirectory (dirname)
	{
		if (!fs.existsSync(dirname)) mkdirp(dirname);
	}
	
	assureFile (filename)
	{
		if (!fs.existsSync(require("path").dirname(filename))) this.assureDirectory(require("path").dirname(filename));
		if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");
	}
	
	append (content)
	{
		this.assureFile(this.path);
		fs.appendFile(this.path, content, function (err) {
			if (err) process.stdout.write("ERROR Failed to write file!");
		});
	}
	
	timeNoColor ()
	{
		var time = this.format;
		const Time = this.getTimeObject();
		for (var key in Time)
		{
			const value = Time[key];
			time = time.split("{" + key + "}").join(value);
		}
		
		return time;
	}
	
	formatNoColor (type, message)
	{
		const v = (this.timeNoColor() + " " + type + " " + message.join(" ") + "\n").replace(/\u001B\[[0-9][0-9]m/gi, "");
		return v;
	}
	
	log ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("   ", args);
		this.append(msg);
		super.log(...args);
		return this;
	}
	
	debug ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("DEB", args);
		this.append(msg);
		super.debug(...args);
		return this;
	}
	
	info ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("INF", args);
		this.append(msg);
		super.info(...args);
		return this;
	}

    trace ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("INF", args);
		this.append(msg);
		super.info(...args);
		return this;
	}
	
	alert ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("ALE", args);
		this.append(msg);
		super.alert(...args);
		return this;
	}
	
	success ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("SUC", args);
		this.append(msg);
		super.success(...args);
		return this;
	}
	
	warning ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("WAR", args);
		this.append(msg);
		super.warning(...args);
		return this;
	}
	
	warn ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("WAR", args);
		this.append(msg);
		super.warn(...args);
		return this;
	}
	
	error ()
	{
		const args = Array.prototype.slice.call(arguments);
		const msg = this.formatNoColor("ERR", args);
		this.append(msg);
		super.error(...args);
		return this;
	}
}

module.exports = {Logging}