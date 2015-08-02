/*
 * ATLauncherBot - https://github.com/ATLauncher/ATLauncherBot
 * Copyright (C) 2015 ATLauncher
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var _ = require('lodash');

var commands = require('../inc/commands');

module.exports.enabled = true;

module.exports.listening_for = 'message#';

module.exports.callback = function (user, channel, message, object) {
    if (message[0] == '!') {
        var name = message;

        if (name.indexOf(" ") != 0) {
            name = message.split(" ")[0];
        }

        name = name.substr(1);

        commands.findCommand(name, function (err, command) {
            if (err) {
                return console.error(err);
            }

            if (!_.isUndefined(command.flood_check) && !_.isUndefined(command.last_run)) {
                if (command.last_run + (command.flood_check * 1000) > (new Date).getTime()) {
                    return console.error(new Error('Cannot run command ' + name + ' as it was run too recently!'));
                }
            }

            command.last_run = new Date().getTime();
            command.callback(name, channel, user, message, object);
        });
    }
};