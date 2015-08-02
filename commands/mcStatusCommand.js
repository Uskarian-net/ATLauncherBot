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

var connection = require('../inc/connection');
var request = require('request');
var _ = require('lodash');

module.exports.enabled = true;

module.exports.name = 'mcstatus';

module.exports.flood_check = 30;

module.exports.callback = function (command_name, channel, user, message, object) {
    request({
        url: 'http://status.mojang.com/check',
        json: true,
        method: 'GET'
    }, function (err, req, body) {
        if (err) {
            return console.error(err);
        }

        var isUp = true;
        var whatsDown = [];

        _.forEach(body, function (item) {
            for (var key in item) {
                if (item[key] != "green") {
                    isUp = false;
                    whatsDown.push(key);
                }
            }
        });

        if (isUp) {
            connection.client.replyToMessage(user, channel, "All Mojang services seem to be up and running!");
        } else {
            connection.client.replyToMessage(user, channel, "The following Mojang services are down: " + whatsDown.join(", "));
        }
    });
};